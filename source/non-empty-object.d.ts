import type {HasRequiredKeys} from './has-required-keys.d.ts';
import type {RequireAtLeastOne} from './require-at-least-one.d.ts';

type HasOnlyIndexSignature<T extends object> =
	string extends keyof T
		? number extends keyof T
			? true // Both string and number index signatures
			: [keyof T] extends [string | number | symbol]
				? true // Only index signature keys
				: false
		: string extends keyof T
			? true
			: false;
/**
Represents an object with at least 1 non-optional key.

This is useful when you need an object where all keys are optional, but there must be at least 1 key.

@example
```
import type {NonEmptyObject} from 'type-fest';

type User = {
	name: string;
	surname: string;
	id: number;
};

type UpdateRequest<Entity extends object> = NonEmptyObject<Partial<Entity>>;

const update1: UpdateRequest<User> = {
	name: 'Alice',
	surname: 'Acme',
};

// At least 1 key is required, therefore this will report a 2322 error:
// Type '{}' is not assignable to type 'UpdateRequest<User>'
// @ts-expect-error
const update2: UpdateRequest<User> = {};
```

@see Use `IsEmptyObject` to check whether an object is empty.

@category Object
*/
export type NonEmptyObject<T extends object> =
	HasRequiredKeys<T> extends true
		? HasOnlyIndexSignature<T> extends true
			// Has only an index signature (e.g. {[k: string]: V}), 
			// so require at least one key explicitly
			? RequireAtLeastOne<T, keyof T>
			// Has real named required keys → T is already non-empty
			: T
		: RequireAtLeastOne<T, keyof T>;

export {};
