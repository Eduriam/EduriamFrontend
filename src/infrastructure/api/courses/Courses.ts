import { Language } from "domain/models/types/languages";

import { FeaturedTopic } from "infrastructure/api/user/topics/Topics";

export interface Course {
  id: Id;
  name: string;
  language1: Language;
  language2: Language;
  thumbnailUrl?: string;
  featuredTopics?: Array<FeaturedTopic>;
}
