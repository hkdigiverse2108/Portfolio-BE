import { IBase, IValidate } from "./base";

export interface IProblemCard {
  title: string;
  description: string;
  icon: string;
}

export interface IFrameworkStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface IAudienceCard {
  title: string;
  emoji: string;
  description: string;
}

export interface IInstagramPost {
  postUrl: string;
  imageUrl: string;
  caption?: string;
  likes?: string;
}

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IWebinar extends IBase {
  isWebinar?: boolean;
  hero: {
    badge: string;
    title: string;
    highlightWord: string;
    subtitle: string;
  };
  presents: {
    tagline: string;
    title: string;
    tags: string[];
    images: string[];
    mentorTag: string;
    mentorName: string;
  };
  urgency: {
    badge: string;
    tagline: string;
    title: string;
    ctaText: string;
  };
  problemSection: {
    eyebrow: string;
    title: string;
    ctaText: string;
    cards: IProblemCard[];
  };
  frameworkSection: {
    eyebrow: string;
    title: string;
    description: string;
    ctaText: string;
    steps: IFrameworkStep[];
  };
  targetAudienceSection: {
    eyebrow: string;
    title: string;
    cards: IAudienceCard[];
    bottomText: string;
    ctaText: string;
  };
  mentorSection: {
    eyebrow: string;
    title: string;
    role: string;
    name: string;
    bio: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    highlights?: string[];
  };
  instagramFeed: IInstagramPost[];
  pricing: {
    amount: number;
    originalAmount: number;
    currency: string;
    discountText: string;
    eyebrow: string;
    title: string;
    badge: string;
    subtitle: string;
    submitButtonText: string;
    trustNote: string;
  };
  faqs: IFaqItem[];
  footerText: string;
  dates?: string[];
  cutoffHours?: number;
}

export interface IWebinarRegistration extends IBase {
  isWebinarRegistration?: boolean;
  fullName: string;
  email: string;
  phoneNo: string;
  startupName?: string;
  amount: number;
  currency?: string;
  webinarDate?: string;
  paymentStatus: "pending" | "success" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paymentFailureReason?: string;
}

export type IWebinarValidate = IValidate & { value: IWebinar };
export type IWebinarRegistrationValidate = IValidate & { value: IWebinarRegistration };
