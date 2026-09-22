import Joi from "joi";
import { baseApiSchema } from "./common";

export const updateWebinarSchema = Joi.object({
  hero: Joi.object({
    badge: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    highlightWord: Joi.string().optional().allow(""),
    subtitle: Joi.string().optional().allow(""),
  }).optional(),
  presents: Joi.object({
    tagline: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    tags: Joi.array().items(Joi.string()).optional(),
    images: Joi.array().items(Joi.string()).optional(),
    mentorTag: Joi.string().optional().allow(""),
    mentorName: Joi.string().optional().allow(""),
  }).optional(),
  urgency: Joi.object({
    badge: Joi.string().optional().allow(""),
    tagline: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    ctaText: Joi.string().optional().allow(""),
  }).optional(),
  problemSection: Joi.object({
    eyebrow: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    ctaText: Joi.string().optional().allow(""),
    cards: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().optional().allow(""),
          description: Joi.string().optional().allow(""),
          icon: Joi.string().optional().allow(""),
        }),
      )
      .optional(),
  }).optional(),
  frameworkSection: Joi.object({
    eyebrow: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    description: Joi.string().optional().allow(""),
    ctaText: Joi.string().optional().allow(""),
    steps: Joi.array()
      .items(
        Joi.object({
          stepNumber: Joi.string().optional().allow(""),
          title: Joi.string().optional().allow(""),
          description: Joi.string().optional().allow(""),
        }),
      )
      .optional(),
  }).optional(),
  targetAudienceSection: Joi.object({
    eyebrow: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    cards: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().optional().allow(""),
          emoji: Joi.string().optional().allow(""),
          description: Joi.string().optional().allow(""),
        }),
      )
      .optional(),
    bottomText: Joi.string().optional().allow(""),
    ctaText: Joi.string().optional().allow(""),
  }).optional(),
  mentorSection: Joi.object({
    eyebrow: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    role: Joi.string().optional().allow(""),
    name: Joi.string().optional().allow(""),
    bio: Joi.string().optional().allow(""),
    image: Joi.string().optional().allow(""),
    buttonText: Joi.string().optional().allow(""),
    buttonLink: Joi.string().optional().allow(""),
    highlights: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  instagramFeed: Joi.array()
    .items(
      Joi.object({
        postUrl: Joi.string().optional().allow(""),
        imageUrl: Joi.string().optional().allow(""),
        caption: Joi.string().optional().allow(""),
        likes: Joi.string().optional().allow(""),
      }),
    )
    .optional(),
  pricing: Joi.object({
    amount: Joi.number().optional(),
    originalAmount: Joi.number().optional(),
    currency: Joi.string().optional().allow(""),
    discountText: Joi.string().optional().allow(""),
    eyebrow: Joi.string().optional().allow(""),
    title: Joi.string().optional().allow(""),
    badge: Joi.string().optional().allow(""),
    subtitle: Joi.string().optional().allow(""),
    submitButtonText: Joi.string().optional().allow(""),
    trustNote: Joi.string().optional().allow(""),
  }).optional(),
  faqs: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().optional().allow(""),
        answer: Joi.string().optional().allow(""),
      }),
    )
    .optional(),
  footerText: Joi.string().optional().allow(""),
  dates: Joi.array().items(Joi.string()).optional(),
  cutoffHours: Joi.number().optional(),
  ...baseApiSchema,
});

export const registerWebinarSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.string().required(),
  startupName: Joi.string().optional().allow(""),
  webinarDate: Joi.string().optional().allow(""),
  amount: Joi.number().optional().default(99),
});
