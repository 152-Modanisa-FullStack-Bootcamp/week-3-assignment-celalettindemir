import {shallowMount} from "@vue/test-utils";
import Counter from "../Counter";

describe('Counter.vue', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper=shallowMount(Counter, {
            mocks: {
                $store: {
                    state: {
                        count: 0
                    }
                }
            }
        });
    });
    it('Component Exist Check', () => {
        expect(wrapper.exists()).toBeTruthy();
    })
    it('Increase button exist check', () => {
        const buttons = wrapper.findAll("button");
        expect(wrapper.exists()).toBeTruthy();
        expect(buttons.length).toBe(2);
        const secondButton = buttons.at(1);
        expect(secondButton.text()).toBe("Increase");
    })
    it('Decrease button exist check', () => {
        const buttons = wrapper.findAll("button");
        expect(buttons.length).toBe(2);
        const firstButton = buttons.at(0);
        expect(firstButton.text()).toBe("Decrease");
    })
    it('Increase button functionality check', () => {
        const buttons = wrapper.findAll("button");
        const secondButton = buttons.at(1);
        const increase=jest.fn();
        wrapper.setMethods({increase:increase});
        secondButton.trigger("click");
        expect(increase).toBeCalled()
    })
    it('Decrease button functionality check', () => {
        const buttons = wrapper.findAll("button");
        const firstButton = buttons.at(0);
        const decrease=jest.fn();
        wrapper.setMethods({decrease:decrease});
        firstButton.trigger("click");
        expect(decrease).toBeCalled();
    })
    it('2 increase + decrease functionality check together', () => {
        const buttons = wrapper.findAll("button");
        const firstButton = buttons.at(0);
        const secondButton = buttons.at(1);
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
})






