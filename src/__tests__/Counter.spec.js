import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "../Counter";
import Vuex from "vuex";
import {actions, state} from "../store";

describe('Counter.vue', () => {
    const localVue=createLocalVue();
    localVue.use(Vuex)
    let wrapper;
    beforeEach(()=>{
        wrapper=shallowMount(Counter, {
            localVue,
            store:new Vuex.Store({
                state,
                actions
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
    it('Increase button functionality check', () => {
        const secondButton = getButton(1);
        const increase=jest.fn();
        wrapper.setMethods({increase:increase});
        secondButton.trigger("click");
        expect(increase).toBeCalled()
    })
    it('Decrease button functionality check', () => {

        const firstButton = getButton(0);
        const decrease=jest.fn();
        wrapper.setMethods({decrease:decrease});
        firstButton.trigger("click");
        expect(decrease).toBeCalled();
    })
    it('2 increase + decrease functionality check together', () => {
        const firstButton = getButton(0);
        const secondButton = getButton(1);
        const increase=jest.fn();
        const decrease=jest.fn();
        wrapper.setMethods({decrease:decrease});
        wrapper.setMethods({increase:increase});
        secondButton.trigger("click");
        secondButton.trigger("click");
        firstButton.trigger("click");
        expect(increase).toBeCalledTimes(2);
        expect(decrease).toBeCalledTimes(1);
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






