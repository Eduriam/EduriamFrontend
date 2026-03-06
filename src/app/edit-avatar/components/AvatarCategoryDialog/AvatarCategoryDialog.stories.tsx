import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { buildShopAvatar } from "app/shop/utils/avatar";

import AvatarCategoryDialog, {
  type IAvatarCategoryDialog,
} from "./AvatarCategoryDialog";

export default {
  title: "pages/edit-avatar/AvatarCategoryDialog",
  component: AvatarCategoryDialog,
} as ComponentMeta<typeof AvatarCategoryDialog>;

const Template: ComponentStory<typeof AvatarCategoryDialog> = (args) => (
  <AvatarCategoryDialog {...args} />
);

export const Open = Template.bind({});
Open.args = {
  open: true,
  onClose: () => undefined,
  onBack: () => undefined,
  category: {
    id: "hair",
    labelKey: "avatarEditor.fields.hair",
    itemField: "hair",
    colorField: "hairColor",
    itemValues: ["hair_1", "hair_2"],
    colorValues: ["darkBrown", "blond"],
  },
  draftAvatar: buildShopAvatar({ hair: "hair_1", hairColor: "darkBrown" }),
  onSelectOption: () => undefined,
} as IAvatarCategoryDialog;
