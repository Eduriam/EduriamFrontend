import { Language } from "domain/models/types/languages";

import { FeaturedTopic } from "infrastructure/api/user/topics/Topics";

export interface Course {
  id: Id;
  name: string;
  language: Language;
  category?: string;
  logoId?: string;
  type?: "career-path" | "course";
  featuredTopics?: Array<FeaturedTopic>;
}
