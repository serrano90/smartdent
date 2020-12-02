/**
 * Test singlenton instance
 */

import { HTTPClient } from '.'

test("check if the instance is equals", () => {
    const getInstance1 = new HTTPClient()
    const getInstance2 = new HTTPClient()

    expect(getInstance1).toEquals(getInstance2)
})
