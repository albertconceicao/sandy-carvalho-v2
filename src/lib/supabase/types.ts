export type ContactSubmissionInsert = {
  name: string;
  whatsapp: string;
  email: string;
  service: string;
  reason?: string | null;
  availability: string;
  therapy_before: string;
  message?: string | null;
};

export type TestimonialInsert = {
  name: string;
  rating: number;
  text: string;
  status?: "pending" | "approved" | "rejected";
};

export type ContactSubmissionRow = ContactSubmissionInsert & {
  id: string;
  created_at: string;
};

export type TestimonialRow = TestimonialInsert & {
  id: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmissionRow;
        Insert: ContactSubmissionInsert;
        Update: Partial<ContactSubmissionInsert>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: TestimonialInsert;
        Update: Partial<TestimonialInsert & { status: "pending" | "approved" | "rejected" }>;
        Relationships: [];
      };
      rate_limit_events: {
        Row: {
          id: string;
          ip_hash: string;
          route: string;
          created_at: string;
        };
        Insert: {
          ip_hash: string;
          route: string;
          id?: string;
          created_at?: string;
        };
        Update: Partial<{
          ip_hash: string;
          route: string;
        }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
