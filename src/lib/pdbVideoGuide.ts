export const PDB_VIDEO_PATH = "/videos/pdb-guide.mp4";

export type PdbVideoMarker = {
  id: string;
  /** Seconds into the video */
  timeSeconds: number;
  /** Display label shown beside the button (e.g. "1.48") */
  timeLabel: string;
  title: string;
  summary: string;
  details: string[];
};

export const PDB_VIDEO_INTRO = {
  title: "PDB Assembly Video Guide",
  description:
    "Walkthrough of the Matek Systems PDB-XT60 power distribution board. Use the timeline buttons to jump to each labeled section in the video and read component notes in the dropdown.",
};

export const PDB_VIDEO_MARKERS: PdbVideoMarker[] = [
  {
    id: "matek-pdb-xt60",
    timeSeconds: 1.48,
    timeLabel: "1.48",
    title: "Matek Systems PDB-XT60",
    summary:
      "Overview of the Matek PDB-XT60 board — the central power hub that accepts battery input and routes current to flight electronics.",
    details: [
      "Matek Systems PDB-XT60 integrates power input, ESC outputs, and regulated BEC rails on one PCB.",
      "Designed for XT60 battery connectors and high-current multirotor builds.",
      "Copper pours and wide traces carry battery current to motor ESCs with minimal voltage drop.",
      "Compact footprint fits standard stack spacing above or below the flight controller.",
    ],
  },
  {
    id: "xt60-input",
    timeSeconds: 4.17,
    timeLabel: "4.17",
    title: "XT60 INPUT",
    summary:
      "The XT60 input pads accept direct connection from the main flight battery.",
    details: [
      "XT60 is a high-current connector standard for 14–20 AWG power leads.",
      "Positive and negative pads must be soldered with clean, low-resistance joints.",
      "Input polarity is marked on the silkscreen — reverse polarity can destroy downstream electronics.",
      "Use adequate wire gauge for your expected continuous and burst current draw.",
    ],
  },
  {
    id: "esc-power-pads",
    timeSeconds: 7.89,
    timeLabel: "7.89",
    title: "ESC Power Pads",
    summary:
      "Dedicated pads distribute battery voltage to each electronic speed controller (ESC).",
    details: [
      "Each ESC pad pair supplies raw battery voltage for motor drive stages.",
      "Solder ESC power leads directly or via short silicone wire for flexibility.",
      "Keep high-current paths short to reduce resistance and heating.",
      "Typical quad builds use four ESC outputs — one per motor corner.",
    ],
  },
  {
    id: "bec-12-to-5",
    timeSeconds: 10.15,
    timeLabel: "10.15",
    title: "12 to 5 BEC",
    summary:
      "The onboard BEC (battery eliminator circuit) steps 12 V down to regulated 5 V for avionics.",
    details: [
      "5 V BEC rail powers flight controller, GPS, telemetry, and other low-voltage peripherals.",
      "Regulated output protects sensitive logic from battery voltage swings during throttle changes.",
      "Check BEC current rating before connecting multiple devices to the 5 V rail.",
      "Some stacks use a separate 12 V rail for cameras or accessories — verify pad labels before wiring.",
    ],
  },
];

export function formatVideoClock(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}:${secs.toFixed(0).padStart(2, "0")}`;
  }
  return `${secs.toFixed(2)}s`;
}
