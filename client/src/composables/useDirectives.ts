import type { DirectiveBinding } from 'vue'
import { useDebounceFn } from '@vueuse/core'

type FormFieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

const vDebounce = {
    beforeMount: (el: FormFieldElement, binding: DirectiveBinding) => {
        const { value, arg } = binding

        el.addEventListener(
            'input',
            useDebounceFn(() => {
            value(el.value)
        }, arg ? parseInt(arg) : 500)
    )
    }
}

export const useDirectives = () => ({
    vDebounce
})
