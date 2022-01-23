import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "../Counter";
import Vuex from "vuex";
import {actions,mutations, state} from "../store";

describe('Counter.vue', () => {
    const localVue=createLocalVue();
    localVue.use(Vuex)
    let wrapper;
    beforeEach(()=>{
        wrapper=shallowMount(Counter, {
            localVue,
            store:new Vuex.Store({
                state,
                actions,
                mutations
            })
        });
    });
    it('Component Exist Check', () => {
        expect(wrapper.exists()).toBeTruthy();
    })
    it('Increase button exist check', () => {
        const buttons = wrapper.findAll("button");
        expect(buttons).toHaveLength(2);
        const secondButton = getButton(1);
        expect(secondButton.text()).toBe("Increase");
    })
    it('Decrease button exist check', () => {
        const buttons = wrapper.findAll("button");
        expect(buttons).toHaveLength(2);

        const firstButton = getButton(0);
        expect(firstButton.text()).toBe("Decrease");
    })
    it('Increase button functionality check', async () => {
        const secondButton = getButton(1);
        let value=wrapper.vm.count;
        await secondButton.trigger("click");
        value++;
        expect(wrapper.find("span").text()).toEqual(`${value}k`);
    })
    it('Decrease button functionality check', async () => {

        const firstButton = getButton(0);
        let value=wrapper.vm.count;
        await firstButton.trigger("click");
        value--;
        expect(wrapper.find("span").text()).toEqual(`${value}k`);
    })
    it('2 increase + decrease functionality check together', async() => {
        const firstButton = getButton(0);
        const secondButton = getButton(1);
        let value=wrapper.vm.count;
        await secondButton.trigger("click");
        await secondButton.trigger("click");
        value+=2;
        expect(wrapper.find("span").text()).toEqual(`${value}k`);
        await firstButton.trigger("click");
        value--;
        expect(wrapper.find("span").text()).toEqual(`${value}k`);
    })
    it('Count text show check', () => {
        const span = wrapper.find("span");
        expect(span.text()).toBe("0k");
    })
    function getButton(index)
    {
        const buttons = wrapper.findAll("button");
        return buttons.at(index);
    }

})






