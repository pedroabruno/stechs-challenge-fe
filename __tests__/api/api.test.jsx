import '@testing-library/jest-dom'
import {getCableModems} from '../../src/api/axios'
import mockAxios from 'jest-mock-axios';

const mockedResponse = {
    documents:[
        {
            _id: "id1",
            name: "cable 1",
        },
        {
            _id: "2",
            name: "cable 2",
        }
    ]
}

afterEach(() => {
    mockAxios.reset();
});

describe('Axios', () => {
    it('getCableModems returns documents', async () => {
        const response = getCableModems(1)
        mockAxios.mockResponse(mockedResponse);
        const result = await response;
        const expected = {
            documents:[
                {
                    _id: "id1",
                    name: "cable 1",
                },
                {
                    _id: "2",
                    name: "cable 2",
                }
            ]
        }
        expect(result.documents).toEqual(expected.documents);
    })
})