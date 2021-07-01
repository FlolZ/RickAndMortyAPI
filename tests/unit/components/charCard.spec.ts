import CharCard from "@/components/char/shared/card/CharCard.vue";
import { CharModel } from "@/lib/models/char/char.model";
import { vueInit } from "@/plugins/utils";
import { shallowMount } from "@vue/test-utils";

describe("CharCard.vue", () => {
    it("renders props.msg when passed", () => {
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
});
