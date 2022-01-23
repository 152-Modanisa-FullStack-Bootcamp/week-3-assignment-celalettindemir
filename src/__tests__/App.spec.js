import {createLocalVue, shallowMount} from "@vue/test-utils";
import App from "../App";
import Vuex from "vuex";
import {actions, getters, mutations, state} from "../store";

describe("App.vue",()=>{
    const localVue=createLocalVue();
    localVue.use(Vuex)
    let wrapper;
    beforeEach(()=>{
        wrapper=shallowMount(App,{
            localVue,
            store:new Vuex.Store({
                state,
                getters,
                actions
            })
        });
    })
    it("h1 exists",()=>{
        const h1 = wrapper.find("h1");
        expect(h1.exists()).toBeTruthy()
    });
    it("h1 text equals to Daily Corona Cases in Turkey check",()=>{
        const h1 = wrapper.find("h1");
        expect(h1.text()).toEqual("Daily Corona Cases in Turkey");
    });
    it("notificationArea class check based on getCount value",async ()=>{
        expect(wrapper.find(".notificationArea").classes()).toContain('safe');
        await mutations.addToCount(state,8)
        expect(wrapper.find(".notificationArea").classes()).toContain('normal');
        await mutations.addToCount(state,8);
        expect(wrapper.find(".notificationArea").classes()).toContain('danger');
    });
    it("notificationArea text message check",()=>{
        const notificationArea = wrapper.find(".notificationArea");
        expect(notificationArea.text()).toBe(wrapper.vm.message)
    });
})



