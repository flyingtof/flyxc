import type { CSSResult, PropertyValues, TemplateResult } from 'lit';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('loader-element')
export class LoaderElement extends LitElement {
  @property()
  show = true;

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
      }
      .full-screen {
        position: fixed;
        display: grid;
        place-items: center;
        width: 100vw;
        height: 100vh;
      }
      #logo {
        width: 90%;
        max-width: 1000px;
      }
    `;
  }

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    const shadowRoot = this.shadowRoot as ShadowRoot;
    (shadowRoot.host as HTMLElement).style.display = this.show ? 'block' : 'none';
  }

  protected render(): TemplateResult {
    return html`
      <svg class="full-screen" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="a">
            <stop offset="0" stop-color="#259f4a" />
            <stop offset="1" stop-color="#124c25" />
          </linearGradient>
          <linearGradient
            href="#a"
            id="b"
            x1="77"
            x2="90"
            y1="83"
            y2="101"
            gradientTransform="matrix(.4 0 0 .4 39 71)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            href="#a"
            id="d"
            x1="74"
            x2="83"
            y1="64"
            y2="75"
            gradientTransform="matrix(.4 0 0 .4 39 71)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            href="#a"
            id="c"
            x1="74"
            x2="83"
            y1="64"
            y2="75"
            gradientTransform="matrix(.4 0 0 .4 39 71)"
            gradientUnits="userSpaceOnUse"
          />
          <filter id="e">
            <feMorphology in="SourceAlpha" operator="dilate" radius=".05" result="thicken" />
            <feGaussianBlur in="thicken" result="blurred" stdDeviation="1" />
            <feFlood flood-color="#136" result="glow" />
            <feComposite in="glow" in2="blurred" operator="in" result="glowCol" />
            <feMerge>
              <feMergeNode in="glowCol" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="hatch" patternTransform="rotate(54)" patternUnits="userSpaceOnUse" width="64" height="1">
            <g>
              <line x1="-32" y1="0" x2="-32" y2="1" stroke="#4ec3ee" stroke-width="55" />
              <line x1="32" y1="0" x2="32" y2="1" stroke="#4ec3ee" stroke-width="55" />
              <animateTransform
                attributeName="transform"
                dur="0.5s"
                repeatCount="indefinite"
                type="translate"
                values="0 0;64 0"
              />
            </g>
          </pattern>
          <pattern id="rays" patternTransform="rotate(48)" patternUnits="userSpaceOnUse" width="100" height="1">
            <line x1="0" y1="0" x2="0" y2="1" stroke="#a8dcee" stroke-width="5" />
            <line x1="25" y1="0" x2="25" y2="1" stroke="#f9f9f9" stroke-width="5" />
            <line x1="40" y1="0" x2="40" y2="1" stroke="#dee0e2" stroke-width="2" />
            <line x1="60" y1="0" x2="60" y2="1" stroke="#a8dcee" stroke-width="8" />
            <line x1="85" y1="0" x2="85" y2="1" stroke="#f9f9f9" stroke-width="10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#4ec3ee" />
        <rect width="100%" height="100%" fill="url(#rays)" />
        <rect width="100%" height="100%" fill="url(#hatch)" />
      </svg>
      <div class="full-screen">
        <svg
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 140 45"
        >
          <defs>
            <linearGradient id="a">
              <stop offset="0" stop-color="#259f4a" />
              <stop offset="1" stop-color="#124c25" />
            </linearGradient>
            <linearGradient
              xlink:href="#a"
              id="b"
              x1="77"
              x2="90"
              y1="83"
              y2="101"
              gradientTransform="matrix(.4 0 0 .4 39 71)"
              gradientUnits="userSpaceOnUse"
            />
            <linearGradient
              xlink:href="#a"
              id="d"
              x1="74"
              x2="83"
              y1="64"
              y2="75"
              gradientTransform="matrix(.4 0 0 .4 39 71)"
              gradientUnits="userSpaceOnUse"
            />
            <linearGradient
              xlink:href="#a"
              id="c"
              x1="74"
              x2="83"
              y1="64"
              y2="75"
              gradientTransform="matrix(.4 0 0 .4 39 71)"
              gradientUnits="userSpaceOnUse"
            />
            <filter id="e">
              <feMorphology in="SourceAlpha" operator="dilate" radius=".05" result="thicken" />
              <feGaussianBlur in="thicken" result="blurred" stdDeviation="1" />
              <feFlood flood-color="#136" result="glow" />
              <feComposite in="glow" in2="blurred" operator="in" result="glowCol" />
              <feMerge>
                <feMergeNode in="glowCol" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g id="plane" width="80">
            <path
              fill="#292929"
              fill-opacity=".5"
              d="m134.079 3.643-8.36 2.33a4152.9 4152.9 0 0 0-2.04.57l-.11.03a4343.68 4343.68 0 0 1-2.04.57l-4.88 1.36a92154.47 92154.47 0 0 1-2.04.57l-22.45 6.27a2.94 2.94 0 0 0-1.62 1.15l-2.65 3.82a.76.76 0 0 0 .42 1.16l16.25 4.79a3.77 3.77 0 0 1 1.73 1.08l7.53 8.3a.82.82 0 0 0 1.29-.11l1-1.52a.96.96 0 0 1 1.4-.22l8.58 6.96a1.44 1.44 0 0 0 1.7.08l5.03-3.36a2.08 2.08 0 0 0 .92-1.64l.12-2.85a3687.1 3687.1 0 0 0 .09-2.11 1866.22 1866.22 0 0 1 .04-.96v-.1l.57-13.66a5761.85 5761.85 0 0 0 .1-2.11 5230.3 5230.3 0 0 1 .06-1.6l.34-8.03a.77.77 0 0 0-.98-.78z"
            />
            <path fill="#5e5e5e" d="m106.129 25.683 8.27 9.1 19.64-30.1z" />
            <path fill="url(#b)" d="m133.98 104.29.7 5.36 19.63-30.1z" transform="translate(-20 -75)" />
            <path fill="#d8d8d8" d="m88.899 20.613 2.86-4.12 42.28-11.8-27.9 20.99z" />
            <path fill="#2fcc5e" d="m91.759 16.493 19.97 4.22 22.31-16.03Z" />
            <path fill="#d8d8d8" d="m133.98 104.29 13.26 10.74 5.75-3.83 1.32-31.66z" transform="translate(-20 -75)" />
            <path fill="url(#c)" d="m132 95.57 3.98 6.28 18.33-22.3z" transform="translate(-20 -75)" />
            <path fill="url(#d)" d="m137.06 97.91.24 2.35 17.01-20.72z" transform="translate(-20 -75)" />
            <path fill="#8d7363" d="m133.609 15.053-.9 21.29-15.92-13.29 7.42-7.9z" />
            <path fill="#2799df" d="m115.899 9.743 2.69 6.05 6.18-4.45-1.95-3.52z" />
            <path fill="#e4b119" d="m122.819 7.823 2.15-.6 1.64 2.8-1.84 1.32z" />
            <path fill="#8d7363" d="m124.969 7.223 1.64 2.8 7.43-5.34z" />
            <path fill="#1b70a4" d="m118.589 15.793-3.1 10.86.22.34 1.32-1.6-.24-2.34 6.82-7.25 1.16-4.46z" />
            <path fill="#a88212" d="m124.769 11.343 1.84-1.32-.97 3.61-2.03 2.17z" />
            <path fill="#53443a" d="m126.609 10.023 7.43-5.34-8.4 8.95z" />
            <path fill="#e4b119" d="m133.679 13.453-8.04.18-1.43 1.53 9.4-.1zm-8.75 16.39 8.06-.08-.08 2.13-5.48.04z" />
            <path fill="#2fcc5e" d="m127.429 31.943 5.48-.05-.2 4.45z" />
            <path
              fill-opacity=".65"
              d="m91.759 16.493 19.97 4.22 3.98 6.28-.21.27-3.77-5.8zm25.27 8.91-.24-2.35 15.94 13.29-14.94-11.86Z"
            />
            <path fill="#2fcc5e" d="m133.679 13.453.36-8.77-8.4 8.95z" />
          </g>
          <path
            id="flyXC"
            fill="red"
            filter="url(#e)"
            d="m66.039 32.643 1.77-3.24h2.23l-2.74 4.66 2.8 4.74h-2.25l-1.8-3.3-1.82 3.3h-2.25l2.81-4.74-2.74-4.66h2.23zm12.26 3.03q-.1 1.52-1.12 2.39-1 .87-2.66.87-1.81 0-2.85-1.21-1.03-1.22-1.03-3.35v-.57q0-1.36.47-2.4.48-1.03 1.37-1.58.89-.55 2.06-.55 1.63 0 2.63.87t1.15 2.45h-1.94q-.07-.91-.51-1.32-.43-.41-1.33-.41-.96 0-1.45.7-.48.69-.49 2.14v.72q0 1.52.46 2.22.46.7 1.46.7.9 0 1.34-.4.44-.41.5-1.27zm-31.09-7.39-.02.04-.1-.04v-.03zm-3.83-.59-.2.24-.04-.03.2-.23zm4 6.28h-.17v-.06h.16zm-.26.03h-.25v-.05h.25zm-.28.02h-.2v-.05h.2zm-.24.04h-.23v-.06h.23zm-.3.04h-.2v-.06h.2zm2.2 2.6h-.1v-.05h.1zm1.47-2.36q-.1 0-.17.1-.08.1 0 .2l-.74.09q0 .07.04.07h.44l.04.07-.65.04q-.32 0-.46.13.03.02.37.02l-.28.07q-.04.02.02.06-.08-.02-.13.02l.53.05q-2.6.43-4.25.82-.13.09-.48.27l-.48.08q-.3.05-.9.2v.33q.04.02.21.02.04 0 .07.02h.1l-.24.04q-.15.02-.15.15-.06 1.39-.24 2.2l.1-.96-.05-.06q-.02 0-.05.06.03.24-.17.98.06-.22.06-.56l-.04.02-.39 1.24-.1.06-.16.52q-.05-.06-.1-.08-.05-.02-.03-.15l.22-.85v-.07l-.03-.06q-.13.06-.17.3l-.07.46-.02-.18-.02-.15q0-.19.06-.32.07-.1.09-.2l-.06-.06q-.03.12-.15.28-.07-.07-.07-.1l.06-.2q.05-.16.05-.36-.05.09-.17.4l-.03-.05q.2-.95.22-1.22v-.08q-.04-.04-.13-.02l.1-1.14q-.06-.06-.08-.06l-.37.17.04-.02q.03-.02.03-.04.04-.02-.03-.02-.04 0-.32.15-.33.19-.42.22l-.04.02-.17-.02q.32.02.6-.3.01.03-.08.03-.04 0-.02-.04v-.06q-.18.19-.28.19l-.07-.02-.04-.04.02-.03q.04-.04.08-.04.05 0 .05.02t.02.02l.07-.17q0-.08-.13-.24.02-.1.08-.26.02-.04-.04-.04-.05 0-.13.08l.06-.23h-.19l.78-.57q.2-.06.48-.28-.02-.02-.07-.02-.2 0-.54.2-.32.21-.43.38-.01-.04.02-.08-.1-.1-.1.02 0-.1.05-.22-.04.04.02.1l.14-.12q-.05.06-.02.1.17-.27.52-.4.24-.07.5-.12l.1-.12v-.07q-.02-.02-.08-.02l-.54.2v.06q0-.02-.07-.02-.1 0-.48.24v-.09q-.04 0-.13.1l.31-.34.13-.06h.04q0 .02.04.02.05 0 .76-.22.03-.11 0-.2h-.04l.02-.04q.04-.04.04-.06v-.16l.01-.26.34-2.8.1-.46q.14-.44.2-.7.16-.95.42-1.48.15-.06.22-.24l.13-.34q-.04.1 0 .15l.13-.22q.11-.15.52-.44l-.13.13q.04.03.11-.04-.07.1-.17.18-.13.15-.09.26.02-.05.11-.16.52-.47.61-.47-.02 0 .06.06.02-.04.09-.08.07-.03.28-.05l.26-.04q.22 0 .44.13l.08.11q.07.1.1.1.04 0 .04-.02t.04-.02q.04 0 .06.05.03.06.07.06.28.02.46.07.13.04.32.2.13.14.26.25.26.18.42.18-.05 0 .13-.09.08.04.1.19.03.2.07.27-.06.02-.3-.03-.24-.08-.28-.08-.03 0-.13.15-.09.13-.12.13-.06 0-.52-.28-.45-.28-.5-.33-.13 0-.04.1-.07-.08-.15-.08l-.09.03q-.15.04-.4.17-.47.52-.82 2.06l-.19 1-.09.14-.11.78q-.06.1-.13.28l-.17 1.16q.02 0 .06.04l.07.02q-.07 0-.15.11.08.06.26.02l.34-.04-.63.22q0 .04.03.04l2.13-.37.52.06q-.52.05-1.72.35l.24.07 2.98-.33h.1l-2.1.33-.05.06q.01.02.14.02l2.5-.41q.47 0 .93.02.55 0 .9.13zm-8.13-1.9h-.06v-.1h.06zm-1.54 3.38-.16.16-.02-.03.15-.17zm1.11 1.55q-.09-.03-.25.08-.23.13-.28.13.16-.1.42-.2h-.01zm-1.14-1-.13.06q-.1.18-.1.1 0-.05.04-.1-.07.02-.24-.08 0 .04.08.04l.31-.1zm.15.3q-.1.11-.1.13l-.02-.08-.01-.05.03.05q.04-.05.1-.05zm-.23-.13-.14.1-.02-.05.13-.09zm-.26.04h-.1v-.06h.1zm1.7 3.77h-.05v-.07h.06zm3.56-12.8-.15-.02q-.1-.04-.15-.04-.14 0-.27.1.09-.03.27-.03.2 0 .3-.02zm-.65.7h-.03l-.13.26.03.02zm-1.05-.1h-.04l-.17.38.06.01zm-.17.49v-.08h-.05v.08zm-.04 0h-.03l-.08.2.04.02zm-.09.33v-.11h-.05v.11zm-.18.3v-.13h-.04v.12zm-1.45 6v-.06h-.09v.05zm-.92 1.57-.02-.04-.08.04v.03zm1.31 1.46v-.32q-.04 0-.07-.03l-.08.1-.1 1.15q.25-.85.25-.9zm9.94-7.57h-.06v-.17h.06zm0 .63h-.06v-.17h.06zm-2.18.42h-.06v-.26h.06zm0 .24-.02.2h-.06l.02-.2zm3.09 4.5q0 .02-.56.4.04.06.06.06.05 0 .1-.05l-.01.05q-.04.02.04.02.05 0 .05-.05.06.09.06.2 0 .11-.04.15-.26.13-.57.48l-.08-.02q-.05-.04-.09-.04-.07 0-.26.15v.1q-.1.05-.18.12-.04.02.03.02.06 0 .2-.07l-.25.11-.11.17q-.1 0-.28.03l-.35.23q-.17.09-.22.27 0-.07-.08-.16l-.05.07q-.08.11 0 .24l-.08-.07-.2.3q.02 0-.08-.1-.14.02-.14.17l.01.3h-.1l.01-.1v-.11q0-.06-.03-.15l-.25.24q-.2 0-.33-.2l-.1.1q0-.08-.05-.14l-.03.04q0 .04-.02.05l.05-.22-.05-.04-.1.17.02-.26q0-.18-.1-.18-.06 0-.17.05 0 .06.02.08l.07-.06q-.02 0-.04.06l-.03.07q0-.1-.1-.17l-.03.02.03.24q-.03-.09-.03-.22-.02-.02-.08-.02-.04 0-.05.02 0 .04-.02.04.02-.02.02-.06l.03-.03q-.07-.08-.16-.15l.14.07q.04-.04-.03-.1.03 0 .05-.08l.23-.37q-.02-.02-.08-.02l-.17.07-.18.08.44-.3-.01-.1q.03-.03.18-.34.02-.04.17-.17.14-.13.13-.22.09-.04.18-.15.7-2.02.87-5.2l-.04-.83-.13 1.8q-.09 1.03-.31 1.79.22-2.47.2-3.08l.04.06.02-.07-.02-.08-.05.04q-.04 0-.04.02l.02-.08.02-.1-.17-2.54q0-.61.1-.9v-.07l.12-.09.02-.07h.02l.05-.02.04.1.17 2.7q.02 0 .02-1.34l-.1-.7q0-.26.08-.6l.05.15q.1-.09.08-.35.13.06.18.06l.11-.15v.13q.06.02.24.02.11 0 .11-.06-.01.1.02.15.02 0 .08-.22.03-.13.13-.13v.1q-.1.08-.13.14l.03.1q.11-.05.26-.27v.26q.02.17.22.15-.05.17-.05.28 0 .18.13 1.07v.3q0 .16.1.2v1.54q0 .83-.23 2.59-.2 1.53-.33 2.1l-.06.2q-.02.05 0 .07.04-.04.11-.04.02 0 .15.13h.07q.1-.11.1-.22l.03.07q.08 0 .08-.07-.04.1-.24.27.14.02.22 0 .07-.01.24-.09.17-.1.2-.1.04 0 .11.08.08.06.1.06.03 0 .05-.04.04-.05.08-.05.16 0 .48.13zm-3.19-3.63h-.03v-.09h.03zm2.78 3.22h-.06v-.09h.06zm-.26-.03-.07.1-.04-.03.07-.11zm-2.63-1.52-.03.13-.04-.02.02-.11zm2.65 3.52-.06.03q-.03.02-.09.02h-.18q.07-.07.18-.07zm-.44-.08-.1.04v-.06l.08-.03zm-2.28-2.48q-.02.2-.24.7-.1.17-.17.37l.3-1.07zm1.7 3.06q-.24.16-.48.42.07.13.2.13.04 0 .04-.02l.02-.02q0 .15-.02.13-.02-.02-.07 0l-.06.02q-.1-.07-.05-.1-.08-.03-.32-.03.37-.31.74-.53zm-2.26-1.32-.03.08-.04-.02.04-.08zm-.24 1.98h-.05v-.15h.05zm1.11-8.92-.07-1.57q-.04 0-.06.55.13.67.13 1.02zm3.02 6.13h-.06l-.03.13h.05zm-1.7-.73h-.06l-.05.25h.03zm-.04.3h-.04l-.07.17.04.02zm.19.28-.04-.06-.19.13.02.06zm-.12 1.98v-.06h-.1v.06zm-2.44.48q-.07-.18-.07-.3l-.1.28q.13-.02.17.02zm-.17-.22-.03-.02-.04.1.04.01zm.54.59h-.05l-.02.15h.03zm7.5 4.94h-.06v-.07h.06zm3-13.08h-.06v-.17h.06zm-.4-.3-.09.07-.03-.03.1-.08zm-.12.37h-.06v-.18h.06zm-1.08-.46-.05-.02h-.06l.04-.11q.02 0 .04.05zm-.66-.35q0 .02-.06.05-.03.02-.03.04 0-.04.05-.17zm-2.74-.74-.04.09-.04-.02.04-.07zm.26.51h-.06l-.02-.16h.04zm.05.15h-.03l-.04-.1h.04zm-.74-.55-.07.03v-.03l.07-.04zm-.02.09-.01.04-.08-.04.02-.04zm4.58 5.81-.04.04-.08-.08.04-.03zm-6.28-5.18h-.05v-.2h.05zm.17.4h-.06v-.07h.06zm7.35 1.2q-.23.36-.56 1.06-.31.69-.83 1.95-.02-.04-.1-.1-.16.17-.14.3l.31.17q-.1-.02-.2.02.05.09.13.13-.06.1.39.44l-.04.04q-.04.03-.1.03-.23 0-.29.02.15.08.28.2.04.08.15.23l-.08-.04q-.07-.05-.13-.05h-.03l-.04.01q-.04 0-.15-.05l-.13-.1-.05.02q.1.13.33.3-.11 0-.35-.05l-.24-.06q-.2 0-.1.26l-.05-.06-.08.04q-.05 0-.05.04 0 .16.33.4-.31-.22-.35-.22-.05 0-.13.1l.14.17q0-.04-.1-.04t-.21.45q-.08.35-.1.52-.03-.02-.13.03.02.02.08.02.02.06-.04.17 0-.02-.1-.11 0 .02-.03.05-.17.78-.24 1.33-.05 0-.13.08v.18l.02.02.1-.09q-.08.11-.04.24l-.15.07.13.08q-.04.1-.08.33 0-.13-.03-.2-.12.15-.06.39-.07.13-.04.2.02.02.02.1v.05q0 .04-.1.1l-.12.86q.04.15.02.44-.06.04-.1.13l-.03.41-.17 1.04q.04-.6.04-1.2 0 .07.04-.06l.05-.5q.08-.76.17-1.18l-.02-.12q-.07.08-.1.17-.09.8-.36 2.52.02-.32-.06-.74 0 .03.04.05.15-.13.15-.46 0-.31.07-.39v-.42q-.05-.06-.1-.06t-.1.06q0-.06-.02-.08-.02 0-.04.04l-.04.05q.02.02.02.06 0 .04.02.06.04-.04.04-.06l.04.02v.1q0 .05.05.03-.07.3-.13.85-.04-.19 0-.54l.04-.15.04-.12q0-.04-.06-.12-.13.6-.13.82 0-.06-.05-.06 0-.1.03-.13-.02-.02-.05-.02.02-.03.02-.3-.13.3-.12.97 0-.28-.03-.55-.13.22-.17.53l-.04.47q-.02-.08-.02-.23 0-.02-.03-.02l-.1.6q.02-.35-.01-.97-.04.1-.04.26l-.06-.05-.09.02v-.11q.15 0 .13.01-.04-.14-.05-.27v-.1q0-.18-.04-.37-.08.1-.06.17.04.1.02.15l-.04.05q-.01.04-.03.04l-.02-.72.05-.02.06-.02q-.06.24.02.3h.02l.05-.74-.03-.15q0-.15.07-.33l-.04-.1.11-.25-.1-.08q-.06-.1.01-.22 0-.02-.05 0-.02.02-.08.48-.05.4.02.48-.04 0-.07-.02-.04.06-.04.17 0-.06-.02-.1-.04.08-.13.2.02.03.06.05l-.06.03q.06.08.17.15h-.1v.22l-.05-.03v.25l-.04-.09-.02-.09v-1.02l-.03-.03q-.04.02-.04.09 0-.11-.06-.06.08-.07.06-.07h.06l.03-.04-.03-.83q-.02.02-.02.06 0-.04.05-.13l.02-.13q-.07-.08-.07 0 .03-.1.05-.36.04-.01.06-.07l.05-.43q.04-.22.15-.53-.02-.13 0-.28.04-.24.17-.68l.11-.17.02-.32.05-.05q-.05-.3.1-.35-.02-.04.05-.15 0-.2.08-.2.01-.1-.02-.19-.17-.11-.52-.5 0-.02-.13-.04-.04-.05-.22-.16.03-.17-.08-.17-.03 0-.03.02.01.02-.02.02-.04 0-.1-.06-.03-.07-.01-.07l.05-.04q-.07-.17-.31-.4-.06-.02-.15-.02l-.37-.58-.2-.28q-.13-.2-.63-1.35v.26l.01.24q-.05-.27-.37-.68.02-.02.06-.2.02-.14.11-.14l-.11-.53q-.11-.4-.11-.48 0-.06.05-.1l.06.06.06-.06q.07 0 .07-.16v-.15q.02-.04-.04-.04-.03 0-.13.1v-.2l.1.08q.07-.18.07-.27.06-.04.13-.06l.22-.07q.04-.04.11-.17-.02-.07.02-.15 0 .02.1.08.09.27-.03.31 0 .1.1.1.03 0 .03-.02.02-.04.06-.04h.13q-.1.1-.07.15l.07-.06q0 .06.1.07 0 .25.08.62.08-.34.19-1.08-.02.11.04.2.03 0 .03-.07 0 .06.06.1l-.19.1q0 .04.04.06h.04q.03.28.1.33-.05.04-.01.13.02-.02.02-.09l.05.26q.04.13.32.44.04-.01.04-.09 0-.04-.11-.33l-.1-.32q0-.1.08-.14-.15-.19.03-.76l.13-.13q0 .02.06.09-.04.06-.04.17 0 .44.56 1.87l.24.38q.05.19.22.58.1.16.61.74.11-.35.44-1.13l.2-.54.23-.5.26-.39h.13q.13 0 .3.15h.03q.02 0 .13-.09.13-.11.17-.11.04 0 .1.05l.1-.22q.1 0 .08.06-.04 0 0 .02.05 0 .09-.08.16 0 .22.15l.02.15q.04.1.2.2l-.05.04-.04.02.02.1q.04 0 .05-.03l.13.04q-.13.02-.24.2.02.02.02.06l.04.02q.05-.06.07-.06.11 0 .22-.3-.05-.03-.16.04.13-.04.31-.24.02-.04-.02-.04.13 0 .13.04 0-.02-.05.06-.04.2-.13.31-.02.02 0 .08.02-.04.22-.2.13-.12.11-.21 0 .05.06.15.02-.04.05-.04.1 0 .13.07.06.13.08.13h.01q-.03.1-.03.32.03 0-.08-.11l-.26.2q-.12.1-.14.24.16-.1.48-.24.09 0 .15.11zm-5.63 2.97-.04.04-.13-.1.02-.05zm-.4-.04h-.06l-.02-.07.04-.02zm3.36 3.56q-.05.26-.18.68-.04.1.01.2-.05-.05-.05 0 0-.22.07-.7l.08-.07q.07-.1.05-.19 0 .15.02.08zm-.26 1.26h-.05v-.17h.05zm-.05.51-.06.3-.1.46q.03-.39.16-1.1zm-.18 1.15q-.04 0-.15-.1l.08-.05.07-.05zm-.02.08-.07.07-.04-.02.07-.07zm-.15.22h-.03v-.17h.03zm-1.88-1.65-.04.11-.04-.02.04-.09zm1.88 2.74h-.03v-.13h.03zm.06.18h-.04v-.14h.04zm-2.11-1.98q-.06-.1 0-.3.11.2 0 .2zm2.03 2.2q0-.05-.09-.05.04-.15.04-.28.05.17.05.34zm-.13-.14h-.03v-.13h.03zm-.42-.28h-.06v-.11h.06zm.5.57h-.06v-.07h.06zm.13.25h-.04v-.12h.04zm.04.22h-.06v-.08h.06zm-.15-.08-.04.04-.04-.06.04-.01zm0 .24q0 .17-.02.23-.06-.13-.06-.23l.02.08q.06-.06.06-.08zm-1.04-.77h-.05v-.11h.05zm-.65-.48-.03.03-.04-.05.04-.02zm.97 1.03-.08.1-.04-.02.08-.12zm-.17-.26-.04.26h-.05l.03-.26zm-.48-.22-.04.07-.04-.01.04-.08zm.5.69h-.06v-.08h.06zm-.52-.37h-.06v-.2h.06zm.17.24zm3.16-12.74q-.05-.05-.13-.05.04-.08 0-.11h-.11q.1.09.1.16zm.28.69-.08-.1q.02-.01.02-.07l-.05.06-.02.05q0 .02.04.04.03 0 .03.02l-.1.09q.1-.04.16-.1zm-1.43.02-.13.09q-.14.26-.3.78zm-4.16-1.56-.04-.07-.04.02.04.05zm5.6 5.68-.05-.03-.02.01.04.04zm-2.68-1.98v-.15q-.33-.38-.7-1.1-.11-.08-.17-.04.3.85.87 1.3zm-2.94-3.27-.07-.02-.06-.02q.02.11.02.3-.04.16-.04.22 0-.06.02-.1.04.04.04.08 0-.13.03-.15.02.02.06.02zm-.1.57v-.1h-.05v.1zm-.34 1.07-.04-.16h-.04l.02.16zm4.73 5.1-.03-.02-.08.14.04.02zm-3.5-2.99-.03-.07h-.04l.04.07zm.2.32-.1-.15-.06.04.11.13zm.45.57-.05-.03-.02.01.04.04zm1.6 2.89v-.13h-.1v.13zm-.15 2.68v-.09h-.04v.1zm-.84-.59v-.18h-.05v.18zm1.02.63-.15-.13v.28l-.05.1.04.16q-.04.15-.04.26.07-.3.15-.28 0-.3.02-.37zm-1.27-.44v-.12h-.06v.12zm-.04.27v-.16h-.04v.16zm.66 1.1h-.03l-.08.48h.06zm-.74-.02-.05-.02-.04.07.04.02zm1.5 2.3-.03-.14h-.04l.04.13z"
          />
          <path
            id="IBIC"
            fill="#fff"
            d="M4.719 23.833h-2.2v-10.65h2.21zm5.76 0v-10.65h3.73q1.93 0 2.94.75 1 .74 1 2.17 0 .78-.4 1.38-.4.6-1.12.87.82.2 1.28.83.48.62.48 1.52 0 1.53-.98 2.32-.98.8-2.8.8zm2.2-4.64v2.88h1.87q.78 0 1.2-.37.45-.37.45-1.02 0-1.46-1.52-1.49zm0-1.55h1.61q1.66-.03 1.66-1.32 0-.72-.42-1.04-.42-.32-1.32-.32h-1.54zm10.86 6.33q-1.74 0-2.84-1.06-1.09-1.07-1.09-2.85v-.2q0-1.2.46-2.13.46-.94 1.3-1.45.85-.5 1.93-.5 1.63 0 2.55 1.02.94 1.02.94 2.9v.86h-5.04q.1.78.62 1.24.52.47 1.3.47 1.23 0 1.91-.88l1.04 1.16q-.47.67-1.29 1.05-.8.37-1.8.37zm-.25-6.49q-.62 0-1.02.43-.39.42-.5 1.21h2.94v-.17q-.01-.7-.38-1.08-.36-.39-1.04-.39zm6.93 6.35h-2.12v-11.23h2.12zm3.97 0h-2.12v-7.91h2.12zm-2.25-9.96q0-.47.32-.78.32-.3.87-.3.54 0 .86.3.32.3.32.78 0 .48-.33.8-.32.3-.85.3-.54 0-.86-.3-.33-.32-.33-.8zm7.63 10.1q-1.74 0-2.84-1.06-1.09-1.07-1.09-2.85v-.2q0-1.2.46-2.13.46-.94 1.3-1.45.85-.5 1.93-.5 1.63 0 2.56 1.02.93 1.02.93 2.9v.86h-5.03q.1.78.6 1.24.53.47 1.32.47 1.22 0 1.9-.88l1.04 1.16q-.47.67-1.28 1.05-.81.37-1.8.37zm-.24-6.49q-.63 0-1.03.43-.38.42-.5 1.21h2.95v-.17q-.02-.7-.38-1.08-.37-.39-1.04-.39zm7.56 3.77 1.47-5.33h2.2l-2.66 7.9h-2.02l-2.67-7.9h2.2zm8.15 2.72q-1.74 0-2.84-1.06-1.09-1.07-1.09-2.85v-.2q0-1.2.46-2.13.46-.94 1.3-1.45.85-.5 1.94-.5 1.62 0 2.55 1.02.93 1.02.93 2.9v.86h-5.03q.1.78.6 1.24.53.47 1.32.47 1.22 0 1.9-.88l1.04 1.16q-.47.67-1.28 1.05-.81.37-1.8.37zm-.24-6.49q-.63 0-1.03.43-.38.42-.5 1.21h2.95v-.17q-.02-.7-.38-1.08-.37-.39-1.04-.39zm-50.08 21.32h-2.2v-10.64h2.21zm14.11-3.54q-.12 1.71-1.27 2.7-1.14.99-3 .99-2.06 0-3.23-1.38t-1.17-3.78v-.65q0-1.54.54-2.71t1.54-1.8q1-.62 2.34-.62 1.84 0 2.97.99 1.12.98 1.3 2.77h-2.2q-.07-1.03-.57-1.5-.5-.46-1.5-.46-1.1 0-1.65.79-.54.78-.55 2.43v.8q0 1.73.52 2.53.52.8 1.65.8 1.02 0 1.51-.46.5-.47.58-1.44zm5.9 3.54q-.15-.28-.21-.7-.77.85-2 .85-1.16 0-1.93-.67-.76-.68-.76-1.7 0-1.26.93-1.93.94-.67 2.7-.68h.97v-.45q0-.55-.28-.88-.28-.33-.89-.33-.53 0-.84.26-.3.25-.3.7h-2.11q0-.69.42-1.28.43-.58 1.2-.9.78-.35 1.74-.35 1.46 0 2.32.74.86.73.86 2.06v3.43q0 1.13.32 1.7v.13zm-1.75-1.47q.47 0 .87-.2.39-.21.58-.57v-1.36h-.79q-1.59 0-1.69 1.1v.13q0 .39.27.65.28.25.76.25zm7.14-6.44.06.91q.85-1.06 2.28-1.06 1.26 0 1.87.74.61.74.63 2.21v5.11h-2.13v-5.06q0-.67-.3-.97-.29-.3-.97-.3-.9 0-1.34.75v5.58h-2.09v-7.9z"
            filter="url(#e)"
          />
        </svg>
      </div>
    `;
  }
}
