import type { ExplodeSlideId } from "@/lib/droneComponents";

export type GuideMarker = {
  id: string;
  timeSeconds: number;
  timeLabel: string;
  title: string;
  summary: string;
  details: string[];
};

export type ComponentGuideConfig = {
  slug: string;
  componentId: ExplodeSlideId;
  title: string;
  eyebrow: string;
  description: string;
  videoPath: string;
  /** GLB path served from /public. null = procedural fallback. */
  modelPath: string | null;
  guideTargetSize: number;
  markers: GuideMarker[];
};

export const COMPONENT_GUIDES: ComponentGuideConfig[] = [
  /* ── Propellers ──────────────────────────────────────────────────────── */
  {
    slug: "propellers",
    componentId: "propellers",
    title: "Propellers",
    eyebrow: "Propulsion",
    description: "Walkthrough of the drone's 10×4.5 carbon-fibre propellers — diameter, pitch, and CW/CCW pairing explained.",
    videoPath: "/videos/propeller-guide.mp4",
    modelPath: null,
    guideTargetSize: 0.22,
    markers: [
      {
        id: "prop-diameter",
        timeSeconds: 2.22, timeLabel: "2.22",
        title: "Diameter: 10 Inches",
        summary: "The 10-inch tip-to-tip diameter defines the rotor disc area, directly determining thrust output and hover efficiency.",
        details: [
          "Larger diameter moves more air per revolution at lower RPM.",
          "10\" is a balanced choice for long-range builds needing efficiency.",
          "Disc loading (thrust ÷ disc area) affects battery consumption.",
          "Match diameter to motor KV and battery voltage for best efficiency.",
        ],
      },
      {
        id: "prop-pitch",
        timeSeconds: 4.38, timeLabel: "4.38",
        title: "Pitch: 4.5 Inches",
        summary: "A 4.5-inch pitch means the blade would advance 4.5 inches per revolution through a solid medium without slip.",
        details: [
          "Lower pitch delivers more torque and better hover efficiency.",
          "Higher pitch increases top speed at the cost of efficiency.",
          "10×4.5 is a proven all-round specification for survey drones.",
          "Pitch angle varies along the blade span for uniform angle-of-attack.",
        ],
      },
      {
        id: "prop-direction",
        timeSeconds: 9.04, timeLabel: "9.04",
        title: "CW and CCW Variants",
        summary: "Paired clockwise and counter-clockwise propellers cancel gyroscopic torque, preventing unwanted yaw drift.",
        details: [
          "Front-left and rear-right motors spin clockwise (CW).",
          "Front-right and rear-left motors spin counter-clockwise (CCW).",
          "Always verify direction before flight — reversed props cause crashes.",
          "Colour-coded nuts or blade markings identify CW vs CCW.",
        ],
      },
    ],
  },

  /* ── Motors ──────────────────────────────────────────────────────────── */
  {
    slug: "motors",
    componentId: "motors",
    title: "Motors",
    eyebrow: "Propulsion",
    description: "Breakdown of the brushless motor's shaft, copper windings, permanent magnets, and precision bearings.",
    videoPath: "/videos/motor-guide.mp4",
    modelPath: "/models/motor.glb",
    guideTargetSize: 0.2,
    markers: [
      {
        id: "motor-shaft",
        timeSeconds: 1.19, timeLabel: "1.19",
        title: "Motor Shaft",
        summary: "The output shaft transmits rotational torque from the rotor bell to the propeller adapter.",
        details: [
          "4 mm hardened steel shaft — standard for this motor class.",
          "D-cut flat machined into the shaft for adapter grub-screw grip.",
          "Precision ground to minimise run-out and vibration at high RPM.",
          "Shaft length accommodates standard prop adapters without spacers.",
        ],
      },
      {
        id: "motor-windings",
        timeSeconds: 4.40, timeLabel: "4.40",
        title: "Copper Windings & Stator",
        summary: "The stator's multi-strand copper windings generate a rotating magnetic field when energised by the ESC's three-phase output.",
        details: [
          "Winding pattern and turn count determine the KV (RPM per volt) rating.",
          "Higher strand count reduces DC resistance and improves efficiency.",
          "12-slot stator with 14-pole (N14) magnet arrangement is common.",
          "Winding resistance measured in milliohms — lower is better.",
        ],
      },
      {
        id: "motor-magnets",
        timeSeconds: 6.30, timeLabel: "6.30",
        title: "Permanent Magnets (N45SH)",
        summary: "N45SH neodymium magnets bonded inside the rotor bell interact with the stator field to produce rotation.",
        details: [
          "N45 grade — high-energy-density sintered neodymium-iron-boron.",
          "SH suffix — thermally stable up to 150 °C continuous operation.",
          "Epoxy bonded and evenly spaced for balanced rotation.",
          "Alternating N/S poles create the AC induction effect.",
        ],
      },
      {
        id: "motor-bearings",
        timeSeconds: 11.42, timeLabel: "11.42",
        title: "High-Speed Bearings & Steel Shaft",
        summary: "Precision radial bearings support shaft loads at high RPM while minimising friction losses.",
        details: [
          "Dual-bearing design: one at top of bell, one at bottom of stator.",
          "ABEC-5 or higher grade for reliable high-speed operation.",
          "4 mm inner diameter, pre-lubricated and sealed against dust.",
          "Steel shaft ensures rigidity under propeller gyroscopic loads.",
        ],
      },
    ],
  },

  /* ── ESC ─────────────────────────────────────────────────────────────── */
  {
    slug: "esc",
    componentId: "esc",
    title: "ESC",
    eyebrow: "Electronics",
    description: "Electronic Speed Controller walkthrough — motor output wires, signal lead, and battery input.",
    videoPath: "/videos/esc-guide.mp4",
    modelPath: "/models/esc.glb",
    guideTargetSize: 0.2,
    markers: [
      {
        id: "esc-output",
        timeSeconds: 2.0, timeLabel: "2.00",
        title: "Three Motor Output Wires",
        summary: "Three-phase wires (A/B/C) carry high-frequency switched current to the motor's stator windings.",
        details: [
          "Phase A, B, C outputs correspond to the motor's three wire leads.",
          "16–18 AWG silicone-insulated wire handles the switching current.",
          "Order of connection determines motor spin direction — swap any two to reverse.",
          "Current is pulse-width modulated at frequencies up to 48 kHz.",
        ],
      },
      {
        id: "esc-signal",
        timeSeconds: 7.0, timeLabel: "7.00",
        title: "Signal and Ground Lead",
        summary: "The signal lead receives digital throttle commands from the flight controller over DShot or PWM protocol.",
        details: [
          "DShot600 protocol delivers 16-bit precision at up to 8 000 Hz polling.",
          "Ground wire is shared with the motor power return path.",
          "3-pin servo connector: GND / Signal / 5 V (if BEC present).",
          "Keep signal lead away from motor phase wires to avoid interference.",
        ],
      },
      {
        id: "esc-battery",
        timeSeconds: 9.0, timeLabel: "9.00",
        title: "Main Battery Input Cable",
        summary: "Thick battery leads connect directly to the PDB, carrying full pack voltage and high burst current.",
        details: [
          "12–14 AWG silicone wire rated for 40 A+ continuous current.",
          "XT60 connector for reliable, low-resistance high-current mating.",
          "Short routing from PDB minimises voltage drop and inductance.",
          "Capacitor bank on input absorbs switching transients.",
        ],
      },
    ],
  },

  /* ── Battery ─────────────────────────────────────────────────────────── */
  {
    slug: "battery",
    componentId: "battery",
    title: "Battery",
    eyebrow: "Power",
    description: "LiPo battery specs — capacity, cell count, discharge rating, and power connector.",
    videoPath: "/videos/battery-guide.mp4",
    modelPath: "/models/battery.glb",
    guideTargetSize: 0.24,
    markers: [
      {
        id: "bat-capacity",
        timeSeconds: 1.63, timeLabel: "1.63",
        title: "5200 mAh Capacity",
        summary: "5 200 milliamp-hours is the total energy reserve — the higher the capacity, the longer the flight time.",
        details: [
          "5 200 mAh stores enough energy for 20–30 min hover at typical load.",
          "Capacity reduces with age — replace when below 80 % rated.",
          "Measure actual capacity with a battery cycler periodically.",
          "Store at 3.8 V per cell (storage charge) to maximise cell life.",
        ],
      },
      {
        id: "bat-voltage",
        timeSeconds: 5.62, timeLabel: "5.62",
        title: "22.2 V (6S) Voltage Rating",
        summary: "Six lithium cells in series (6S) give a nominal 22.2 V and fully-charged voltage of 25.2 V.",
        details: [
          "Each LiPo cell: 3.7 V nominal, 4.2 V fully charged, 3.5 V cutoff.",
          "Higher voltage = faster motors at same KV rating.",
          "6S is a popular balance of efficiency and motor compatibility.",
          "Check that all ESCs and the BEC support 6S input before use.",
        ],
      },
      {
        id: "bat-discharge",
        timeSeconds: 8.53, timeLabel: "8.53",
        title: "35C Discharge / 115.44 Wh",
        summary: "A 35C continuous discharge rating means the pack can deliver 35 × 5 200 mA = 182 A instantaneously.",
        details: [
          "35C × 5.2 Ah = 182 A max continuous draw — well above motor peaks.",
          "115.44 Wh energy content: calculated as 22.2 V × 5.2 Ah.",
          "IATA limits carry-on lithium batteries to ≤ 100 Wh; check regulations.",
          "Higher C rating does not always mean better quality — check IR.",
        ],
      },
      {
        id: "bat-connector",
        timeSeconds: 10.85, timeLabel: "10.85",
        title: "XT60 Power Connector",
        summary: "XT60 is the industry standard for 30–60 A continuous current in drone power systems.",
        details: [
          "Gold-plated 4 mm bullet contacts rated 60 A continuous.",
          "Keyed connector prevents reverse-polarity insertion.",
          "Nylon housing rated to 120 °C.",
          "Always solder with proper heat and flux for a reliable, low-resistance joint.",
        ],
      },
    ],
  },

  /* ── Flight Controller ───────────────────────────────────────────────── */
  {
    slug: "flight-controller",
    componentId: "flight-controller",
    title: "Flight Controller",
    eyebrow: "Avionics",
    description: "Flight controller hardware tour — STM32H7 processor, USB-C, ESC connector, and power/UART ports.",
    videoPath: "/videos/fc-guide.mp4",
    modelPath: "/models/fc.glb",
    guideTargetSize: 0.2,
    markers: [
      {
        id: "fc-mcu",
        timeSeconds: 1.78, timeLabel: "1.78",
        title: "STM32H7 MCU",
        summary: "The STM32H7 processor runs the real-time flight firmware at up to 480 MHz, handling sensor fusion and control loops simultaneously.",
        details: [
          "Cortex-M7 core at 480 MHz with FPU for fast floating-point math.",
          "Onboard flash stores flight firmware (Betaflight / ArduPilot).",
          "Hardware accelerated gyro sampling up to 32 kHz loop rate.",
          "Multiple DMA channels prevent CPU blocking on peripheral I/O.",
        ],
      },
      {
        id: "fc-usbc",
        timeSeconds: 4.32, timeLabel: "4.32",
        title: "USB-C Port",
        summary: "The USB-C port enables firmware flashing, parameter tuning, and black-box data download via a PC.",
        details: [
          "USB Full-Speed (12 Mbps) CDC-ACM virtual COM for configurator.",
          "Powers the FC from PC USB during bench setup — no battery needed.",
          "Used by Betaflight/INAV configurator for PID tuning and logging.",
          "Keep port covered with boot to prevent vibration-induced disconnects.",
        ],
      },
      {
        id: "fc-esc",
        timeSeconds: 6.78, timeLabel: "6.78",
        title: "10-Pin ESC Connector",
        summary: "The dedicated 10-pin ESC connector routes DShot motor signals and telemetry back to the flight controller.",
        details: [
          "Carries DShot600 signals for all 4 motor channels.",
          "Bidirectional DSHOT returns motor RPM telemetry to FC.",
          "Ground and current-sensor signals share the same connector.",
          "Locking connector prevents inflight disconnection.",
        ],
      },
      {
        id: "fc-uart",
        timeSeconds: 10.14, timeLabel: "10.14",
        title: "UART & 5 V / 10 V PSU",
        summary: "Multiple UART ports connect GPS, telemetry radio, and RC receiver, while regulated supplies power peripherals.",
        details: [
          "Typically 4–6 UARTs available for peripherals.",
          "5 V regulated BEC powers RC receiver, GPS, and sensors.",
          "10 V rail available for HD video transmitters on some boards.",
          "UART mapping is configured in firmware via port assignment.",
        ],
      },
    ],
  },

  /* ── Pixhawk ─────────────────────────────────────────────────────────── */
  {
    slug: "pixhawk",
    componentId: "pixhawk",
    title: "Pixhawk",
    eyebrow: "Avionics",
    description: "Pixhawk autopilot hardware — GPS port, power module, ESC signal pins, and telemetry radio.",
    videoPath: "/videos/pixhawk-guide.mp4",
    modelPath: "/models/pixhawk.glb",
    guideTargetSize: 0.2,
    markers: [
      {
        id: "px-gps",
        timeSeconds: 4.39, timeLabel: "4.39",
        title: "GPS Port",
        summary: "The dedicated GPS/Compass port provides a combined UART + I²C interface for external GNSS receivers.",
        details: [
          "UART for NMEA/UBX position data from GNSS module.",
          "I²C bus for external compass (magnetometer) on the GPS mast.",
          "JST-GH 6-pin connector — standard Pixhawk pinout.",
          "GPS is mounted away from power cables to reduce compass interference.",
        ],
      },
      {
        id: "px-power",
        timeSeconds: 8.49, timeLabel: "8.49",
        title: "Power Module & ESC Signal Pins",
        summary: "The power module connector provides battery voltage, current sense data, and regulated 5 V to the flight computer.",
        details: [
          "Voltage divider reports pack voltage to the ADC for battery alerting.",
          "Hall-effect or resistive shunt measures current in real time.",
          "6-pin DF13 power connector carries: V_batt, I_sense, GND, 5V.",
          "ESC output rail routes PWM/DShot to each speed controller.",
        ],
      },
      {
        id: "px-telemetry",
        timeSeconds: 12.09, timeLabel: "12.09",
        title: "Telemetry Radio",
        summary: "The telemetry port enables bidirectional MAVLink communication with a ground control station over 915/433 MHz radio.",
        details: [
          "MAVLink v2 protocol transmits attitude, GPS, battery, and modes.",
          "Typical range: 300 m–5 km depending on module and antenna.",
          "Ground station (Mission Planner / QGC) displays live telemetry.",
          "Used for parameter upload, mission download, and remote arming.",
        ],
      },
    ],
  },

  /* ── PDB ─────────────────────────────────────────────────────────────── */
  {
    slug: "pdb",
    componentId: "pdb",
    title: "Power Distribution Board",
    eyebrow: "Power",
    description: "Walkthrough of the Matek Systems PDB-XT60 — XT60 input, ESC power pads, and dual BEC outputs.",
    videoPath: "/videos/pdb-guide.mp4",
    modelPath: "/models/pdb.glb",
    guideTargetSize: 0.22,
    markers: [
      {
        id: "pdb-overview",
        timeSeconds: 1.48, timeLabel: "1.48",
        title: "Matek Systems PDB-XT60",
        summary: "The Matek PDB-XT60 centralises power input, ESC distribution, and dual regulated BEC rails on a single compact PCB.",
        details: [
          "Integrates XT60 input, 4× ESC pads, 5 V BEC, and 12 V BEC.",
          "Sized for standard 30.5 × 30.5 mm and 45 × 45 mm stack mounting.",
          "Heavy copper pours minimise resistance under full motor load.",
          "Current capacity: up to 120 A continuous, 200 A burst.",
        ],
      },
      {
        id: "pdb-xt60",
        timeSeconds: 4.17, timeLabel: "4.17",
        title: "XT60 Input",
        summary: "The XT60 pads accept the flight battery's positive and negative leads, feeding raw voltage to all downstream circuits.",
        details: [
          "XT60 connector rated for 60 A continuous current.",
          "Polarity marked on silkscreen — always double-check before soldering.",
          "Reverse polarity will destroy ESCs and other connected electronics.",
          "Use flux and sufficient heat to make a clean, low-resistance solder joint.",
        ],
      },
      {
        id: "pdb-esc",
        timeSeconds: 7.89, timeLabel: "7.89",
        title: "ESC Power Pads",
        summary: "Four dedicated pad pairs distribute raw battery voltage to each ESC for motor drive.",
        details: [
          "Each pair: positive (+) and negative (−) at battery voltage.",
          "Solder ESC power leads directly for minimum resistance.",
          "Short, direct runs reduce inductance and voltage spikes.",
          "Label or colour-code wires to simplify troubleshooting.",
        ],
      },
      {
        id: "pdb-bec",
        timeSeconds: 10.15, timeLabel: "10.15",
        title: "5 V BEC & 12 V BEC",
        summary: "Dual regulated BEC outputs supply 5 V for avionics and 12 V for accessories without an external regulator.",
        details: [
          "5 V BEC: powers FC, GPS, RC receiver, and telemetry (up to 2 A).",
          "12 V BEC: powers FPV camera, video transmitter, or LED (up to 1 A).",
          "Switching regulators maintain output under load variations.",
          "Check total current draw against BEC rating before adding devices.",
        ],
      },
    ],
  },

  /* ── Camera ──────────────────────────────────────────────────────────── */
  {
    slug: "camera",
    componentId: "camera",
    title: "Camera / Gimbal",
    eyebrow: "Payload",
    description: "Gimbal camera assembly — lens housing, mounting bracket, and wiring harness explained.",
    videoPath: "/videos/camera-guide.mp4",
    modelPath: "/models/camera.glb",
    guideTargetSize: 0.2,
    markers: [
      {
        id: "cam-lens",
        timeSeconds: 3.6, timeLabel: "3.60",
        title: "Lens & Sensor Housing",
        summary: "The lens and sensor housing protects the imaging chip and defines field-of-view, resolution, and low-light performance.",
        details: [
          "M12 lens mount standard — interchangeable focal lengths.",
          "Wide-angle lens (120°+) is typical for FPV and survey imaging.",
          "Sensor size determines dynamic range and noise performance.",
          "Housing is thermally bonded to dissipate sensor heat.",
        ],
      },
      {
        id: "cam-bracket",
        timeSeconds: 6.1, timeLabel: "6.10",
        title: "U-Shaped Mounting Bracket",
        summary: "The U-shaped gimbal bracket allows camera tilt adjustment and provides vibration isolation from the airframe.",
        details: [
          "CNC aluminium alloy construction for rigidity under g-loads.",
          "Tilt angle adjustable from 0° (level) to 60° downward.",
          "Anti-vibration rubber grommets on mounting points.",
          "Secure all bolts with thread-lock for vibration resistance.",
        ],
      },
      {
        id: "cam-wiring",
        timeSeconds: 7.8, timeLabel: "7.80",
        title: "VCC / GND / Video Signal",
        summary: "Three-wire interface: red (VCC power), black (ground), and yellow (composite or digital video output).",
        details: [
          "Red +VCC: supply 5–12 V from BEC (check camera spec).",
          "Black GND: return path — must be common with video receiver.",
          "Yellow Video: analogue composite (CVBS) or digital serial output.",
          "Separate power and signal grounds reduce hum on video feed.",
        ],
      },
    ],
  },

  /* ── GPS ─────────────────────────────────────────────────────────────── (no video provided — omit)
     Leaving GPS out of this list since no video was provided.
  */

  /* ── Airframe ────────────────────────────────────────────────────────── */
  {
    slug: "airframe",
    componentId: "airframe",
    title: "Airframe",
    eyebrow: "Structure",
    description: "Carbon fibre frame assembly — centre plates, colour-coded arms, motor mounts, and landing gear attachment.",
    videoPath: "/videos/frame-guide.mp4",
    modelPath: "/models/frame.glb",
    guideTargetSize: 0.26,
    markers: [
      {
        id: "frame-plates",
        timeSeconds: 1.23, timeLabel: "1.23",
        title: "Centre Plates",
        summary: "Dual 3 K carbon fibre centre plates sandwich the electronics stack and distribute loads across all four arms.",
        details: [
          "Top and bottom plates in 2 mm 3K carbon-fibre weave.",
          "30.5 × 30.5 mm and 20 × 20 mm stack mounting holes.",
          "Threaded brass inserts for M3 standoff screws.",
          "Vibration-isolating grommets between plates and FC stack.",
        ],
      },
      {
        id: "frame-arms",
        timeSeconds: 5.0, timeLabel: "5.00",
        title: "Red & White Oriented Arms",
        summary: "Colour-coded arm tubes give instant orientation reference in the field — red for front, white for rear.",
        details: [
          "Carbon fibre tube construction — high stiffness, low weight.",
          "Red arms denote front flight direction.",
          "White arms denote rear — both visible from ground in any orientation.",
          "Arms clamp between top and bottom plates — tool-free removal.",
        ],
      },
      {
        id: "frame-motormount",
        timeSeconds: 7.69, timeLabel: "7.69",
        title: "Reinforced Motor Mount",
        summary: "Reinforced tips at each arm end carry the motor torque reaction loads without cracking during hard landings.",
        details: [
          "16 × 16 mm M3 motor mounting pattern — industry standard.",
          "Ribbed underside resists in-plane bending from gyroscopic forces.",
          "Replace immediately if tip shows cracks — propagation is rapid.",
          "Optional TPU printed protection caps absorb minor impacts.",
        ],
      },
      {
        id: "frame-landing",
        timeSeconds: 10.01, timeLabel: "10.01",
        title: "Landing Gear Attachment",
        summary: "Bottom-plate attachment points allow the quick-release landing legs to be fitted without disturbing the electronics stack.",
        details: [
          "Four M3 tapped holes per side receive the gear bracket bolts.",
          "Reinforced plate area around gear mounts distributes impact forces.",
          "Ground clearance: ≥ 65 mm to clear a standard battery.",
          "Optional rubber feet on leg ends reduce concrete surface wear.",
        ],
      },
    ],
  },

  /* ── Remote Controller ───────────────────────────────────────────────── */
  {
    slug: "remote-controller",
    componentId: "remote-controller",
    title: "Remote Controller",
    eyebrow: "Ground Control",
    description: "Remote controller tour — throttle gimbal, direction gimbal, LCD telemetry screen, and auxiliary switches.",
    videoPath: "/videos/remote-guide.mp4",
    modelPath: "/models/remote.glb",
    guideTargetSize: 0.24,
    markers: [
      {
        id: "rc-throttle",
        timeSeconds: 1.47, timeLabel: "1.47",
        title: "Throttle Gimbal",
        summary: "The left gimbal stick controls collective throttle (up/down) and yaw rotation (left/right) in Mode 2 configuration.",
        details: [
          "Hall-effect sensor — contactless, 10+ million cycle rated.",
          "Throttle axis has no spring return — holds position when released.",
          "Yaw axis spring-returns to centre for stable heading hold.",
          "Gimbal tension is adjustable via setscrew on transmitter rear.",
        ],
      },
      {
        id: "rc-direction",
        timeSeconds: 4.85, timeLabel: "4.85",
        title: "Direction Gimbal",
        summary: "The right gimbal controls pitch (forward/back) and roll (left/right) — both axes spring-return to centre.",
        details: [
          "Hall-effect sensors on both axes for precision and longevity.",
          "Spring-centred design returns to neutral on release.",
          "Dual-rate and expo settings in firmware reduce sensitivity near centre.",
          "Used for all attitude control in manual and stabilised modes.",
        ],
      },
      {
        id: "rc-lcd",
        timeSeconds: 6.56, timeLabel: "6.56",
        title: "LCD Telemetry Screen",
        summary: "The built-in LCD displays battery voltage, link quality, and telemetry data received from the aircraft.",
        details: [
          "Receives MAVLink or SPORT telemetry over the RF link.",
          "Displays: battery %, RSSI, GPS sats, altitude, flight mode.",
          "Backlit for visibility in bright sunlight with brightness control.",
          "Adjustable display pages cycle through custom telemetry fields.",
        ],
      },
      {
        id: "rc-switches",
        timeSeconds: 10.0, timeLabel: "10.00",
        title: "SWA, SWB, SWC, SWD",
        summary: "Four auxiliary switches (A–D) are mapped to flight modes, RTL, payload release, and other mission functions.",
        details: [
          "SWA: 2-position — typically arm / disarm or mode bank select.",
          "SWB: 3-position — flight mode switch (manual / stabilise / auto).",
          "SWC: 2-position — return-to-home or failsafe override.",
          "SWD: 3-position — gimbal tilt preset, payload drop, or camera trigger.",
        ],
      },
    ],
  },
];

/* ── Lookup helpers ────────────────────────────────────────────────────── */

export const GUIDE_BY_SLUG = Object.fromEntries(
  COMPONENT_GUIDES.map((g) => [g.slug, g]),
) as Record<string, ComponentGuideConfig | undefined>;

export const GUIDE_BY_COMPONENT_ID = Object.fromEntries(
  COMPONENT_GUIDES.map((g) => [g.componentId, g]),
) as Record<string, ComponentGuideConfig | undefined>;

/** URL for the guide page, or null if no guide exists. */
export function guideUrl(componentId: string): string | null {
  const g = GUIDE_BY_COMPONENT_ID[componentId];
  return g ? `/guides/${g.slug}` : null;
}

export function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}:${s.toFixed(0).padStart(2, "0")}` : `${s.toFixed(2)}s`;
}
