import type { ExplodeSlideId } from "@/lib/droneComponents";

export type ComponentUiCopy = {
  eyebrow: string;
  tagline: string;
  purpose: string;
  bullets: string[];
};

export const COMPONENT_UI_COPY: Record<ExplodeSlideId, ComponentUiCopy> = {
  propellers: {
    eyebrow: "Propulsion",
    tagline: "Precision thrust, engineered for efficiency.",
    purpose:
      "High-performance carbon fiber propellers convert motor torque into controlled lift and thrust across the full flight envelope.",
    bullets: [
      "Carbon fiber construction",
      "Lightweight, rigid airfoil",
      "High efficiency across RPM range",
      "Weather and impact resistant",
    ],
  },
  motors: {
    eyebrow: "Propulsion",
    tagline: "Brushless power at every corner.",
    purpose:
      "High-efficiency brushless DC (BLDC) motors provide smooth, reliable thrust with excellent torque and thermal performance, enabling stable flight and precise control for demanding aerial missions.",
    bullets: [
      "Brushless DC (BLDC) outrunner motors",
      "360 KV rating",
      "High torque density",
      "Three-phase electronic commutation",
      "High-efficiency power delivery",
      "ESC compatible",
      "Quad-motor propulsion system",
      "Optimized for long-endurance and heavy-lift applications",
    ],
  },
  esc: {
    eyebrow: "Electronics",
    tagline: "Precision control for efficient propulsion.",
    purpose:
      "Electronic Speed Controllers (ESCs) convert flight controller commands into precisely timed three-phase signals, enabling smooth, efficient, and reliable operation of each brushless motor.",
    bullets: [
      "40A continuous current rating",
      "Three-phase brushless motor control",
      "High-efficiency MOSFET design",
      "Fast throttle response",
      "Over-current and over-temperature protection",
      "Compatible with BLDC motors",
      "Supports stable and efficient power delivery",
    ],
  },
  battery: {
    eyebrow: "Power System",
    tagline: "High-capacity energy for extended flight.",
    purpose:
      "The high-performance lithium polymer (LiPo) battery provides reliable power delivery, enabling long flight endurance, stable voltage output, and consistent performance during demanding aerial missions.",
    bullets: [
      "Battery Type: Lithium Polymer (LiPo)",
      "Configuration: 6S (22.2V)",
      "Capacity: 10,000 mAh",
      "Discharge Rate: 50C",
      "Nominal Voltage: 22.2V",
      "Rechargeable high-density cells",
      "Optimized for long-endurance UAV operations",
    ],
  },
  "flight-controller": {
    eyebrow: "Flight Control",
    tagline: "The intelligent core of the aircraft.",
    purpose:
      "The flight controller processes sensor data and pilot or autonomous flight commands to maintain stability, navigation, and precise control throughout the mission.",
    bullets: [
      "32-bit ARM microcontroller",
      "Integrated IMU (Gyroscope & Accelerometer)",
      "Multi-rotor flight stabilization",
      "High-speed PWM/DShot ESC output support",
      "UART interfaces for GPS, telemetry, and peripherals",
      "I²C and SPI communication support",
      "USB configuration and firmware updates",
      "Compatible with autonomous flight systems",
    ],
  },
  pixhawk: {
    eyebrow: "Flight Control",
    tagline: "Mission-critical intelligence for autonomous flight.",
    purpose:
      "The Cube Orange+ autopilot serves as the central flight management system, processing sensor inputs and executing real-time flight algorithms to deliver exceptional stability, navigation accuracy, and autonomous mission capabilities.",
    bullets: [
      "Cube Orange+ Flight Controller",
      "Triple-redundant IMU architecture",
      "Dual redundant barometers",
      "32-bit STM32H7 high-performance processor",
      "Integrated vibration isolation system",
      "Multiple UART, CAN, I²C, SPI, and PWM interfaces",
      "GPS, telemetry, RTK, LiDAR, and companion computer support",
    ],
  },
  pdb: {
    eyebrow: "Power Management",
    tagline: "Reliable power delivery for every onboard system.",
    purpose:
      "The Power Distribution Board efficiently distributes power from the main battery to the flight controller, ESCs, and other onboard electronics while ensuring stable and reliable electrical performance.",
    bullets: [
      "High-current power distribution",
      "Compatible with 6S LiPo battery systems",
      "Supports multiple ESC outputs",
      "Integrated power filtering",
      "Compact and lightweight PCB design",
      "High-efficiency copper traces",
      "XT60 power input compatible",
    ],
  },
  gps: {
    eyebrow: "Navigation",
    tagline: "Precision positioning for autonomous flight.",
    purpose:
      "The GPS module provides accurate real-time positioning, navigation, and timing information, enabling autonomous flight, waypoint missions, Return-to-Home (RTH), and precise location tracking.",
    bullets: [
      "Multi-constellation GNSS receiver",
      "High-precision positioning",
      "Fast satellite acquisition",
      "Real-time location tracking",
      "Integrated digital compass",
      "UART communication interface",
      "Compatible with Cube Orange+ autopilot",
      "Optimized for outdoor UAV operations",
    ],
  },
  camera: {
    eyebrow: "Vision System",
    tagline: "Real-time vision for confident flight.",
    purpose:
      "The FPV camera captures live video and transmits a low-latency video feed to the ground station or pilot, providing real-time situational awareness for manual and autonomous drone operations.",
    bullets: [
      "High-definition image sensor",
      "Low-latency video output",
      "Wide-angle field of view",
      "Lightweight and compact design",
      "Low-light optimized imaging",
      "Digital signal processing",
      "Compatible with FPV video transmission systems",
      "Low power consumption",
    ],
  },
  airframe: {
    eyebrow: "Airframe",
    tagline: "Engineered for strength, stability, and mission versatility.",
    purpose:
      "The drone frame provides the structural foundation for the UAV, securely supporting propulsion, flight electronics, battery, payloads, and landing gear while maintaining optimal balance and flight stability.",
    bullets: [
      "Foldable quadcopter frame",
      "Lightweight, high-strength construction",
      "Integrated landing gear",
      "Modular component mounting",
      "Vibration-resistant design",
      "Optimized weight distribution",
      "Payload-ready platform",
      "Weather-resistant structural design",
    ],
  },
  "remote-controller": {
    eyebrow: "Ground Control",
    tagline: "Reliable control with precision at your fingertips.",
    purpose:
      "The FlySky FS-i6 transmitter provides secure, low-latency wireless communication between the pilot and the UAV, enabling precise manual control and reliable command transmission during flight operations.",
    bullets: [
      "Model: FlySky FS-i6",
      "Frequency: 2.4 GHz AFHDS 2A",
      "Channels: 6 Channels (Expandable to 10 with firmware update)",
      "Operating Range: Up to 1 km (environment dependent)",
      "Display: Backlit LCD Screen",
      "Control Mode: Mode 1 / Mode 2 selectable",
      "Power Supply: 4 × AA Batteries",
      "Receiver Compatibility: FlySky AFHDS 2A receivers",
    ],
  },
};

export const OVERVIEW_COPY = {
  eyebrow: "Engineering Explorer",
  title: "Interactive Drone\nComponent Explorer",
  subtitle:
    "Inspect every subsystem in photorealistic 3D. Scroll the panel to focus each component.",
  hint: "Scroll to explore",
};
