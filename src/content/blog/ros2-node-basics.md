---
title: '【示例】ROS 2 笔记：用 rclcpp 写一个最小的发布/订阅节点'
description: '示例文章：从创建功能包到编写 Publisher / Subscriber，记录 ROS 2 C++ 节点的基本结构。'
date: 2026-10-20
tags: ['ros2', 'cpp', '学习笔记']
sample: true
---

> 这是一篇**示例文章**，用于演示博客的排版效果（标题、代码块、表格、引用等）。可以直接删除或替换为你自己的笔记。

## 创建功能包

在工作空间的 `src` 目录下用 `ros2 pkg create` 生成一个 C++ 功能包：

```bash
mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src
ros2 pkg create --build-type ament_cmake demo_pubsub --dependencies rclcpp std_msgs
```

## 发布者节点

一个最小的 Publisher：继承 `rclcpp::Node`，创建 publisher 和定时器。

```cpp
#include <chrono>
#include <rclcpp/rclcpp.hpp>
#include <std_msgs/msg/string.hpp>

using namespace std::chrono_literals;

class Talker : public rclcpp::Node {
public:
  Talker() : Node("talker") {
    pub_ = create_publisher<std_msgs::msg::String>("chatter", 10);
    timer_ = create_wall_timer(500ms, [this] {
      std_msgs::msg::String msg;
      msg.data = "hello #" + std::to_string(count_++);
      RCLCPP_INFO(get_logger(), "publish: %s", msg.data.c_str());
      pub_->publish(msg);
    });
  }

private:
  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr pub_;
  rclcpp::TimerBase::SharedPtr timer_;
  size_t count_ = 0;
};

int main(int argc, char** argv) {
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<Talker>());
  rclcpp::shutdown();
  return 0;
}
```

## 订阅者节点

```cpp
class Listener : public rclcpp::Node {
public:
  Listener() : Node("listener") {
    sub_ = create_subscription<std_msgs::msg::String>(
        "chatter", 10,
        [this](const std_msgs::msg::String& msg) {
          RCLCPP_INFO(get_logger(), "heard: %s", msg.data.c_str());
        });
  }

private:
  rclcpp::Subscription<std_msgs::msg::String>::SharedPtr sub_;
};
```

## 编译与运行

在 `CMakeLists.txt` 中添加可执行文件并安装后：

```bash
cd ~/ros2_ws
colcon build --packages-select demo_pubsub
source install/setup.bash
ros2 run demo_pubsub talker   # 终端 1
ros2 run demo_pubsub listener # 终端 2
```

## 常用调试命令

| 命令 | 作用 |
| --- | --- |
| `ros2 node list` | 查看当前运行的节点 |
| `ros2 topic list -t` | 查看话题及消息类型 |
| `ros2 topic echo /chatter` | 打印话题内容 |
| `ros2 topic hz /chatter` | 查看发布频率 |

## 小结

- 节点通过继承 `rclcpp::Node` 组织逻辑，publisher / subscription / timer 都是节点的成员。
- QoS 的 `10` 是历史深度（KEEP_LAST），实际项目中要根据传感器数据特点选择 QoS 配置。
