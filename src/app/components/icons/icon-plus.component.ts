import { Component } from '@angular/core';

@Component({
  selector: 'icon-plus',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  `,
})
export class IconPlusComponent {}
