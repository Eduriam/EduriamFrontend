import { KeyedMutator } from "swr";

import { optimisticMutationOption } from "../API";

export default function mutateArrayItem<T>(
  array: Array<T & { id: Id }>,
  itemId: Id,
  change: Partial<T>,
  mutate: KeyedMutator<Array<T>>,
  updateFn: (obj: Partial<T>) => unknown,
) {
  mutate(
    async () => {
      await updateFn({ id: itemId, ...change });

      return array.map((item) => {
        if (item.id === itemId) {
          return { ...item, ...change };
        } else {
          return item;
        }
      });
    },
    optimisticMutationOption<Array<T>>(
      array.map((item) => {
        if (item.id === itemId) {
          return { ...item, ...change };
        } else {
          return item;
        }
      }),
    ),
  );
}
