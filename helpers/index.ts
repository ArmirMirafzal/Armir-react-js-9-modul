// unknown

/* 1 */

function stringifyForLogging(value: unknown): string {
	if (typeof value === "function") {
		// Within this branch, `value` has type `Function`,
		// so we can access the function's `name` property
		const functionName = value.name || "(anonymous)";
		return `[function   =>>>>>> ${functionName}]`;
	}

	if (value instanceof Date) {
		// Within this branch, `value` has type `Date`,
		// so we can call the `toISOString` method
		return `data =>>>  ${value.toISOString()}`;
	}

	return String(value);
}

const date = new Date();

console.log(
	"natija  =>>>  ",
	stringifyForLogging(function () {})
);

/* 2 */

function isNumberArray(value: unknown): value is number[] {
	return Array.isArray(value) && value.every((element) => typeof element === "number");
}

const unknownValue: unknown = [15, 23, 8, 4, 42, 16];

if (isNumberArray(unknownValue)) {
	const max = Math.max(...unknownValue);
	console.log(max);
}

/* 3 */

type UnionType1 = unknown | null; // unknown
type UnionType2 = unknown | undefined; // unknown
type UnionType3 = unknown | string; // unknown
type UnionType4 = unknown | number[]; // unknown
type UnionType6 = unknown | number; // unknown
type UnionType7 = unknown | boolean; // unknown
type UnionType5 = unknown | any; // any

let i: UnionType3 = 1;

console.log("testing =>>>", typeof i);

/* yuqoridagi kodlar  ushbu linkda joylashgan  ->  https://mariusschulz.com/blog/the-unknown-type-in-typescript */
