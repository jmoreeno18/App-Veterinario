import { Component } from '@angular/core';

@Component({
  selector: 'icon-user',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-[var(--color-primario)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0
           015.356-1.857M15 10a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  `,
})
export class IconUserComponent {}
