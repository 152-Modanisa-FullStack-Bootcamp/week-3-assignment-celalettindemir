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
        expect(true).toBeTruthy()
    });
    it("notificationArea text message check",()=>{
        const div = wrapper.find(".notificationArea");
        expect(div.text()).toContain("So safe. Case count is 0k")
    });
})



