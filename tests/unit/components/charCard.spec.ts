import CharCard from "@/components/char/shared/card/CharCard.vue";
import { CharModel } from "@/lib/models/char/char.model";
import { vueInit } from "@/plugins/utils";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuetify from 'vuetify';

describe("CharCard.vue", () => {
    const localVue = createLocalVue()
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it("renders props.char when passed", () => {
        vueInit();
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

        const wrapper = shallowMount(CharCard, {
            propsData: { char, loading: true },
        });
        expect(wrapper.text()).toContain(name);
    });


    it('should have a custom title and match snapshot', () => {
        vueInit();

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

        const wrapper = mount(CharCard, {
            localVue,
            vuetify,
            propsData: { char, loading: false },
        })

        // With jest we can create snapshot files of the HTML output
        expect(wrapper.html()).toMatchSnapshot()

        // We could also verify this differently
        // by checking the text content
        const title = wrapper.find('.v-card__title > span')

        expect(title.text()).toBe(name)
    })

});
