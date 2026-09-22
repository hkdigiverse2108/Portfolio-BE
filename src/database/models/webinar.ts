import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { IWebinar } from "../../type";

const problemCardSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    icon: { type: String },
  },
  { _id: false },
);

const frameworkStepSchema = new mongoose.Schema(
  {
    stepNumber: { type: String },
    title: { type: String },
    description: { type: String },
  },
  { _id: false },
);

const audienceCardSchema = new mongoose.Schema(
  {
    title: { type: String },
    emoji: { type: String },
    description: { type: String },
  },
  { _id: false },
);

const instagramPostSchema = new mongoose.Schema(
  {
    postUrl: { type: String },
    imageUrl: { type: String },
    caption: { type: String },
    likes: { type: String },
  },
  { _id: false },
);

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: String },
    answer: { type: String },
  },
  { _id: false },
);

const webinarSchema = new mongoose.Schema<IWebinar>(
  {
    isWebinar: { type: Boolean, default: true },
    hero: {
      badge: { type: String },
      title: { type: String },
      highlightWord: { type: String },
      subtitle: { type: String },
    },
    presents: {
      tagline: { type: String },
      title: { type: String },
      tags: [{ type: String }],
      images: [{ type: String }],
      mentorTag: { type: String },
      mentorName: { type: String },
    },
    urgency: {
      badge: { type: String },
      tagline: { type: String },
      title: { type: String },
      ctaText: { type: String },
    },
    problemSection: {
      eyebrow: { type: String },
      title: { type: String },
      ctaText: { type: String },
      cards: [problemCardSchema],
    },
    frameworkSection: {
      eyebrow: { type: String },
      title: { type: String },
      description: { type: String },
      ctaText: { type: String },
      steps: [frameworkStepSchema],
    },
    targetAudienceSection: {
      eyebrow: { type: String },
      title: { type: String },
      cards: [audienceCardSchema],
      bottomText: { type: String },
      ctaText: { type: String },
    },
    mentorSection: {
      eyebrow: { type: String },
      title: { type: String },
      role: { type: String },
      name: { type: String },
      bio: { type: String },
      image: { type: String },
      buttonText: { type: String },
      buttonLink: { type: String },
      highlights: [{ type: String }],
    },
    instagramFeed: [instagramPostSchema],
    pricing: {
      amount: { type: Number, default: 99 },
      originalAmount: { type: Number, default: 999 },
      currency: { type: String, default: "₹" },
      discountText: { type: String, default: "90% OFF" },
      eyebrow: { type: String },
      title: { type: String },
      badge: { type: String },
      subtitle: { type: String },
      submitButtonText: { type: String },
      trustNote: { type: String },
    },
    faqs: [faqItemSchema],
    footerText: { type: String },
    dates: [{ type: String }],
    cutoffHours: { type: Number, default: 12 },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

// Map to existing "settings" collection to avoid MongoDB Atlas 500 collections limit
export const webinarModel = mongoose.model<IWebinar>("webinar", webinarSchema, "settings");
