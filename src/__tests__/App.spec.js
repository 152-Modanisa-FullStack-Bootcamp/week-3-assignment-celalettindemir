import {shallowMount} from "@vue/test-utils";
import App from "../App";

describe("App.vue",()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallowMount(App,{
            mocks: {
                $store: {
                    state: {
                        count: 0
                    },
                    getters:{
                        getCount()
                        {
                            return this.$store.state.count;
                        }
                    }
                }
            }
        });
    })
    it("h1 exists",()=>{
        const h1 = wrapper.find("h1");
        expect(h1.exists()).toBeTruthy()
    });
    it("h1 text equals to Daily Corona Cases in Turkey check",()=>{
        const h1 = wrapper.find("h1");
        expect(h1.text()).toContain("Daily Corona Cases in Turkey");
    });
    it("notificationArea class check based on getCount value",()=>{
        const notificationArea = wrapper.find(".notificationArea");
        const count=wrapper.vm.getCount();
        expect(notificationArea.text()).toBe(`So safe. Case count is ${count}k`)
    });
    it("notificationArea text message check",()=>{
        const notificationArea = wrapper.find(".notificationArea");
        expect(notificationArea.text()).toContain("So safe. Case count is 0k")
    });
})



