# Pico Queue Telemetry Transport (PQTT) Specification

The PQTT (Pico Queue Telemetry Transport) is designed as a lightweight, UI-first messaging protocol, leveraging the simplicity and flexibility of the Pico ecosystem. It focuses on real-time, topic-based messaging suitable for HTML components, with a minimal backend requirement.

## Key Components

### PicoObject
The core data entity in PQTT is the PicoObject, which serves both as a data entity and a message. It includes fields such as `id`, `pid`, `topic`, `type`, `data`, and `meta`. These fields facilitate the identification, categorization, and processing of messages within the system.

### Representation Formats
PicoObjects can be represented in three formats:
- **Single Line**: A compact format with tab-separated values.
- **Stanza**: A text-based format where each field is on a new line, separated by blank lines.
- **JSON**: A standard JSON object format.

### Message Storage and Notification
Messages are stored in named pipes (FIFOs) within the Linux filesystem, utilizing the [inotify](file:///Users/mricos/src/js-study-group/pico/instructions.txt#51%2C119-51%2C119) system for real-time notifications to subscribed consumers.

### Bash Functions for Messaging
- **Creating PicoObject Pipes**: The [create_pico_pipe](file:///Users/mricos/src/js-study-group/pico/instructions.txt#57%2C4-57%2C4) function initializes a named pipe for a topic.
- **Writing to PicoObject Pipes**: The [write_pico_object](file:///Users/mricos/src/js-study-group/pico/instructions.txt#106%2C18-106%2C18) function writes new PicoObjects to the pipe.
- **Reading and Processing PicoObject Pipes**: The [process_pico_pipe](file:///Users/mricos/src/js-study-group/pico/instructions.txt#106%2C112-106%2C112) function subscribes to and processes incoming PicoObjects.
- **Processing PicoObjects**: The placeholder function [process_pico_object](file:///Users/mricos/src/js-study-group/pico/instructions.txt#74%2C16-74%2C16) is used for parsing and routing logic.

### Subscription Scheme
A file-based subscription scheme enables consumers to subscribe to topics by listening to the corresponding pipe, facilitated by the [subscribe_to_topic](file:///Users/mricos/src/js-study-group/pico/instructions.txt#94%2C4-94%2C4) and [publish_to_topic](file:///Users/mricos/src/js-study-group/pico/instructions.txt#101%2C4-101%2C4) bash functions.

## Implementation Notes
- The PQTT protocol is designed to be simple and lightweight, avoiding the overhead of traditional message brokers.
- It is UI-first, making it particularly suited for HTML components and real-time updates in web applications.
- The use of named pipes and [inotify](file:///Users/mricos/src/js-study-group/pico/instructions.txt#51%2C119-51%2C119) for messaging aligns with the protocol's goal for minimal backend requirements.

This specification outlines the foundational aspects of PQTT, focusing on simplicity, real-time messaging, and UI integration.