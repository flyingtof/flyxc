import './ui/track-modal';

import { RuntimeTrack } from 'flyxc/common/src/runtime-track';
import { CSSResult, customElement, html, LitElement, property, TemplateResult } from 'lit-element';

import { modalController } from '@ionic/core/components';

import { controlStyle } from '../styles/control-style';

@customElement('name-ctrl-element')
export class NameElement extends LitElement {
  @property({ attribute: false })
  name = '';
  @property({ attribute: false })
  color = 'black';
  @property({ attribute: false })
  track?: RuntimeTrack;

  static get styles(): CSSResult {
    return controlStyle;
  }

  protected render(): TemplateResult {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/line-awesome@1/dist/line-awesome/css/line-awesome.min.css"
      />
      <div style="cursor: pointer" @click=${this.handleSelect}>
        <i class="las la-user-astronaut la-2x" style=${`color: ${this.color};`}></i>
        ${this.name}
      </div>
    `;
  }

  // Activates the next track.
  private async handleSelect() {
    const modal = await modalController.create({
      component: 'track-modal',
    });
    await modal.present();
  }
}
