import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

type RolesT = 'USER' | 'STAFF' | 'ADMIN';

type AreUnique<T extends RolesT[]> = T extends [
	infer First,
	...infer Rest extends RolesT[]
]
	? First extends Rest[number]
		? false // Duplicate found
		: AreUnique<Rest>
	: true;

export const Roles = <T extends RolesT[]>(
	...roles: T & (AreUnique<T> extends true ? T : never)
) => SetMetadata(ROLES_KEY, roles);
