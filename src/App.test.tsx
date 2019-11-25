import React from "react";
import App from './App';
import {mount, shallow} from 'enzyme';
import SpyHttpClient from "./SpyHttpClient";


function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

function flushPromises2() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

function flushPromises3() {
    return new Promise(resolve => process.nextTick(resolve));
}

function flushPromises4(func) {
    return setImmediate(func)
}

describe('<App />', () => {

    // it('gets data on mount - FAILING', () => {
    //     const spyHttpClient = new SpyHttpClient();
    //     spyHttpClient.stubbedGetPromise = Promise.resolve(['one', 'two'])
    //     const component = shallow(<App httpClient={spyHttpClient}/>)
    //
    //     const itemTexts = component.find('.data-item').map(it => it.text());
    //     expect(itemTexts).toHaveLength(2);
    //     expect(itemTexts[0]).toEqual('one')
    //     expect(itemTexts[1]).toEqual('two')
    // })

    describe('getting data on mount', () => {

        it('with NEXTTICK', (done) => {
            const spyHttpClient = new SpyHttpClient();
            spyHttpClient.stubbedGetPromise = Promise.resolve(['one', 'two'])
            const component = shallow(<App httpClient={spyHttpClient}/>)

            process.nextTick(() => {
                const itemTexts = component.find('.data-item').map(it => it.text());
                expect(itemTexts).toHaveLength(2);
                expect(itemTexts[0]).toEqual('one')
                expect(itemTexts[1]).toEqual('two')
                done()
            })
        })

        it('with THEN', () => {
            const spyHttpClient = new SpyHttpClient();
            spyHttpClient.stubbedGetPromise = Promise.resolve(['one', 'two'])
            const component = shallow(<App httpClient={spyHttpClient}/>)

            return spyHttpClient.stubbedGetPromise.then(() => {
                const itemTexts = component.find('.data-item').map(it => it.text());
                expect(itemTexts).toHaveLength(2);
                expect(itemTexts[0]).toEqual('one')
                expect(itemTexts[1]).toEqual('two')
            })
        })

        it('with FLUSHING', async () => {
            const spyHttpClient = new SpyHttpClient();
            spyHttpClient.stubbedGetPromise = Promise.resolve(['one', 'two'])
            const component = shallow(<App httpClient={spyHttpClient}/>)

            await flushPromises()

            const itemTexts = component.find('.data-item').map(it => it.text());
            expect(itemTexts).toHaveLength(2);
            expect(itemTexts[0]).toEqual('one')
            expect(itemTexts[1]).toEqual('two')
        })
    });

    describe('getting new data on button click', () => {
        it('with SETTIMEOUT', (done) => {
            const spyHttpClient = new SpyHttpClient();
            spyHttpClient.stubbedGetPromise = Promise.resolve(['uno'])
            const component = shallow(<App httpClient={spyHttpClient}/>)

            process.nextTick(() => {

                expect(component.find('.data-item').text()).toEqual('uno')
                spyHttpClient.stubbedGetPromise = Promise.resolve(['one', 'two'])
                component.find('.data-button').simulate('click')

                setTimeout(() => {
                    const itemTexts = component.find('.data-item').map(it => it.text());
                    expect(itemTexts).toHaveLength(2);
                    expect(itemTexts[0]).toEqual('one')
                    expect(itemTexts[1]).toEqual('two')
                    done()
                }, 0)
            })
        })

        it('with THEN', () => {
            const spyHttpClient = new SpyHttpClient();
            spyHttpClient.stubbedGetPromise = Promise.resolve(['uno'])
            const component = shallow(<App httpClient={spyHttpClient}/>)

            return spyHttpClient.stubbedGetPromise.then(() => {

                expect(component.find('.data-item').text()).toEqual('uno')
                spyHttpClient.stubbedGetPromise = Promise.resolve(['one', 'two'])
                component.find('.data-button').simulate('click')

            }).then(() => {
                const itemTexts = component.find('.data-item').map(it => it.text());
                expect(itemTexts).toHaveLength(2);
                expect(itemTexts[0]).toEqual('one')
                expect(itemTexts[1]).toEqual('two')
            })
        })

        it('with FLUSHING', async () => {
            const spyHttpClient = new SpyHttpClient();
            spyHttpClient.stubbedGetPromise = Promise.resolve(['uno'])
            const component = shallow(<App httpClient={spyHttpClient}/>)

            await flushPromises()

            expect(component.find('.data-item').text()).toEqual('uno')
            spyHttpClient.stubbedGetPromise = Promise.resolve(['one', 'two'])
            component.find('.data-button').simulate('click')

            await flushPromises()

            const itemTexts = component.find('.data-item').map(it => it.text());
            expect(itemTexts).toHaveLength(2);
            expect(itemTexts[0]).toEqual('one')
            expect(itemTexts[1]).toEqual('two')
        })
    })
})