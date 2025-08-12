import { expect, test } from "vitest";
import { Slug } from "./slug.js";

test('It should be able to create a new slug from text',()=>{
    const slug = Slug.createFromText('This is a new slug!')
    expect(slug.value).toEqual('this-is-a-new-slug')
})