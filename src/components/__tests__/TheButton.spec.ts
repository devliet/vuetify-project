import { expect, describe, it} from 'vitest'
import { mount} from '@vue/test-utils'
import component from '../atoms/TheButton.vue'

export default {
    props: {
        theme: 'dark'
    }
  }

describe('TheButton.vue', ()=> {
    describe('when mounted', ()=>{
        it('renders properly', () => {
            const wrapper = mount(component, {});
            expect(wrapper.html()).toContain('button');
        });
        it('defaults to light theme', ()=>{
            const wrapper = mount(component, {});
            expect(wrapper.classes()).toContain('light');
        });
        //mytest
        it('check dark theme', ()=>{
            const wrapper = mount(component, {props: {theme: 'dark'}});
            expect(wrapper.classes()).toContain('dark');
        });
    });
});

