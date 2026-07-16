// Public-site domain types — ported from driive-admin/lib/types.ts (same Supabase
// schema). Only the subset the instructor-site renderer + enquiry form need.

export type TransmissionTaught = "manual" | "automatic" | "both";

/** One review as returned (denormalised) inside EnquiryFormInfo.reviews. */
export interface ReviewItem {
  author: string;
  rating: number;
  body: string;
  role: string | null;
}

/** Public-safe branding for the hosted/embedded enquiry form (enquiry_form_info RPC). */
export interface EnquiryFormInfo {
  instructor_id: string;
  business_name: string;
  instructor_name: string;
  logo_url: string | null;
  brand_color: string | null;
  teaching_town: string | null;
  service_areas: string[];
  transmission_taught: TransmissionTaught | null;
  bio: string | null;
  price_from_pence: number | null;
  rating: number;
  review_count: number;
  reviews: ReviewItem[];
  headline: string | null;
  subline: string | null;
  enabled: boolean;
}

// --- Instructor public website (0055) ----------------------------------------
export interface InstructorSiteService {
  title: string;
  body: string;
  price_pence?: number;
}
export interface InstructorSiteGalleryItem {
  url: string;
  caption?: string;
}

/** Public-safe website data for the rendered page (instructor_site RPC). */
export interface InstructorSitePublic {
  instructor_id: string;
  slug: string;
  business_name: string;
  instructor_name: string;
  logo_url: string | null;
  brand_color: string | null;
  accent_color: string | null;
  hero_image_url: string | null;
  gallery: InstructorSiteGalleryItem[];
  teaching_town: string | null;
  service_areas: string[];
  transmission_taught: TransmissionTaught | null;
  bio: string | null;
  about: string | null;
  headline: string | null;
  subheading: string | null;
  services: InstructorSiteService[];
  price_from_pence: number | null;
  rating: number;
  review_count: number;
  reviews: ReviewItem[];
  show_reviews: boolean;
  show_enquiry: boolean;
  form_code: string | null;
  published: boolean;
  is_pro: boolean; // false once the instructor's Pro plan lapses — site goes dark
}
