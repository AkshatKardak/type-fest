import {expectNever, expectType} from 'tsd';
import type {NonEmptyObject, RequireAtLeastOne} from '../index.d.ts';

type TestType1 = {
	a: string;
	b: boolean;
};

type TestType2 = {
	a?: string;
	b?: boolean;
};

type TestType3 = {
	a: string;
	b?: boolean;
};

type TestType4 = {};

declare const test1: NonEmptyObject<TestType1>;
declare const test2: NonEmptyObject<TestType2>;
declare const test3: NonEmptyObject<TestType3>;
declare const test4: NonEmptyObject<TestType4>;

expectType<TestType1>(test1);
expectType<RequireAtLeastOne<TestType2>>(test2);
expectType<TestType3>(test3);
expectNever(test4);

// Test for issue #821 — NonEmptyObject should reject {} for dynamic/index-signature types

type IndexSigType = {[key: string]: string | number | undefined};

interface CommonArguments {
	[filter: string]: NonEmptyObject<IndexSigType>;
}

// Empty object must be rejected — at least 1 key required
const bad: CommonArguments = {foo: {}};

// Valid — foo has at least 1 key
const good: CommonArguments = {foo: {bar: 'hello'}};
expectType<CommonArguments>(good);