import { shallowMount } from "@vue/test-utils";
import ContactDisplayModal from "@/components/ContactDisplayModal.vue";

describe("ContactDisplayModal.vue", () => {
  const wrapper = shallowMount(ContactDisplayModal, {
    propsData: {
      selectedContact: {
        first_name: "Benjamin",
        last_name: "Lee",
        phone: ["5555555555"],
        email: ["email@example.com"],
        birthdate: "2020-01-01",
        address: [
          {
            line1: "l1",
            line2: "l2",
            zip: "00000",
            state: "AA",
            city: "City",
          },
        ],
      },
    },
  });
  it("renders phone number as tel link", () => {
    expect(wrapper.html()).toContain('<a href="tel:5555555555">');
  });
  it("renders phone as human readable", () => {
    expect(wrapper.text()).toContain("(555) 555-5555");
  });

  it("renders email as mailto link", () => {
    expect(wrapper.html()).toContain('<a href="mailto:email@example.com">');
  });

  it("renders city, state, and zip correctly", () => {
    expect(wrapper.text()).toContain("City, AA 00000");
  });
});
