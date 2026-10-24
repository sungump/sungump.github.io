---
title: '【示例】C++ 笔记：unique_ptr 与 shared_ptr 的选择'
description: '示例文章：整理现代 C++ 智能指针的所有权语义和常见误用。'
date: 2026-10-12
tags: ['cpp', '学习笔记']
sample: true
---

> 这是一篇**示例文章**，用于演示博客效果，可直接删除或替换。

## 先问“谁拥有它”

选择智能指针的核心问题是**所有权**：

- **独占所有权** → `std::unique_ptr<T>`：零额外开销，只能移动不能拷贝。
- **共享所有权** → `std::shared_ptr<T>`：引用计数，最后一个持有者释放资源。
- **只观察、不拥有** → 裸指针 / 引用，或 `std::weak_ptr<T>`（观察 `shared_ptr` 管理的对象）。

默认优先 `unique_ptr`，确实需要共享时再升级到 `shared_ptr`。

## unique_ptr

```cpp
#include <memory>

struct Sensor {
  explicit Sensor(int id) : id(id) {}
  int id;
};

std::unique_ptr<Sensor> make_sensor(int id) {
  return std::make_unique<Sensor>(id);  // 返回时自动移动
}

void take(std::unique_ptr<Sensor> s);   // 按值传参 = 转移所有权

int main() {
  auto s = make_sensor(1);
  take(std::move(s));                   // s 之后为空
}
```

## shared_ptr 与循环引用

`shared_ptr` 互相持有会导致引用计数永远不归零：

```cpp
struct Node {
  std::shared_ptr<Node> next;
  std::weak_ptr<Node> prev;  // 用 weak_ptr 打破环
};
```

需要访问 `weak_ptr` 指向的对象时，先 `lock()`：

```cpp
if (auto p = node->prev.lock()) {
  // p 是 shared_ptr，在这个作用域内对象保证存活
}
```

## 常见误用

1. 用同一个裸指针构造两个 `shared_ptr` → 重复释放。用 `std::make_shared`。
2. 在类内部需要 `shared_ptr<this>` 时直接 `shared_ptr<T>(this)` → 应继承 `std::enable_shared_from_this<T>`。
3. 函数参数不涉及所有权却写成 `const std::shared_ptr<T>&` → 直接传 `T&` 或 `T*` 更清晰。
