import CharCard from "@/components/char/shared/card/CharCard.vue";
import { CharModel } from "@/lib/models/char/char.model";
import { vueInit } from "@/plugins/utils";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuetify from 'vuetify';

describe("CharCard.vue", () => {
    const localVue = createLocalVue();
    let vuetify: Vuetify;
    const name = "charName-1";
    const char: CharModel = {
        name,
        id: 1,
        status: "Alive",
        species: "Species",
        type: "Type",
        gender: "Male",
        origin: {
            name: "originName",
            url: "originUrl"
        },
        location: {
            name: "Location",
            url: "locationUrl",
            type: "locationType",
            dimension: "locationDimension",
            residents: ["char", "char1"],
            created: "locationCreated",
        },
        image: "charImg",
        episode: [],
        url: "charUrl",
        created: "charCreated",
    };

    beforeEach(() => {
        vuetify = new Vuetify();
        vueInit();
    })

    it("renders props.char when passed", () => {
        const wrapper = shallowMount(CharCard, {
            propsData: { char, loading: true },
        });
        expect(wrapper.text()).toContain(name);
    });


    it('should have a custom title and match snapshot', () => {
        const wrapper = mount(CharCard, {
            localVue,
            vuetify,
            propsData: { char, loading: false },
        });

        expect(wrapper.html()).toMatchSnapshot()
        const title = wrapper.find('.v-card__title > span')
        expect(title.text()).toBe(name)
    });

    it('should emit an event when the action v-card is clicked', () => {
        const wrapper = mount(CharCard, {
            localVue,
            vuetify,
            propsData: { char, loading: false },
        })

        const event = jest.fn()
        const vcard = wrapper.find('.v-card')
        wrapper.vm.$on('onCardClick', event)

        expect(event).toHaveBeenCalledTimes(0)
        vcard.trigger('click')
        expect(event).toHaveBeenCalledTimes(1)
    });
});
