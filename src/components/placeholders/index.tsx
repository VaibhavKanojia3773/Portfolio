"use client";

import type { AccentTheme } from "@/data/projects";
import NeuralPlaceholder from "./NeuralPlaceholder";
import GalaxyPlaceholder from "./GalaxyPlaceholder";
import AgentPlaceholder from "./AgentPlaceholder";
import VisionPlaceholder from "./VisionPlaceholder";
import RagPlaceholder from "./RagPlaceholder";
import OcrPlaceholder from "./OcrPlaceholder";
import TranslatePlaceholder from "./TranslatePlaceholder";
import WavePlaceholder from "./WavePlaceholder";

export {
  NeuralPlaceholder,
  GalaxyPlaceholder,
  AgentPlaceholder,
  VisionPlaceholder,
  RagPlaceholder,
  OcrPlaceholder,
  TranslatePlaceholder,
  WavePlaceholder,
};

export function ThemedPlaceholder({ theme }: { theme: AccentTheme }) {
  switch (theme) {
    case "neural":
      return <NeuralPlaceholder />;
    case "galaxy":
      return <GalaxyPlaceholder />;
    case "agent":
      return <AgentPlaceholder />;
    case "vision":
      return <VisionPlaceholder />;
    case "rag":
      return <RagPlaceholder />;
    case "ocr":
      return <OcrPlaceholder />;
    case "translate":
      return <TranslatePlaceholder />;
    case "wave":
    default:
      return <WavePlaceholder />;
  }
}
