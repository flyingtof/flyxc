import '../menu-element';
import '../dashboard-element';
import '../name-element';
import './airspace-element';
import './airways-element';
import './tracking-element';
import './path-element';

import { RuntimeTrack } from 'flyxc/common/src/runtime-track';
import {
  css,
  CSSResult,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { connect } from 'pwa-helpers';

import { Units } from '../../logic/units';
import * as sel from '../../redux/selectors';
import { RootState, store } from '../../redux/store';

@customElement('controls-element')
export class ControlsElement extends connect(store)(LitElement) {
  @property({ attribute: false })
  map!: google.maps.Map;

  @internalProperty()
  private timeSec = 0;
  @internalProperty()
  private track?: RuntimeTrack;
  @internalProperty()
  private units?: Units;
  @internalProperty()
  private color = '';

  stateChanged(state: RootState): void {
    this.timeSec = state.app.timeSec;
    this.track = sel.currentTrack(state);
    this.units = state.units;
    if (this.track) {
      this.color = sel.trackColors(state)[this.track.id];
    }
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        font: 12px 'Nobile', verdana, sans-serif;
        height: 1px;
        margin: 3px 3px 0 0;
      }
    `;
  }

  protected render(): TemplateResult {
    return html`<div id="ct">
      <menu-ctrl-element></menu-ctrl-element>
      <airspace-element .map=${this.map}></airspace-element>
      <airways-element .map=${this.map}></airways-element>
      <path-element .map=${this.map}></path-element>
      <tracking-element .map=${this.map}></tracking-element>
      ${this.track?.name
        ? html`
            <name-ctrl-element .name=${this.track.name} .color=${this.color} .track=${this.track}></name-ctrl-element>
          `
        : ''}
      ${this.track
        ? html`
            <dashboard-ctrl-element
              .track=${this.track}
              .timeSec=${this.timeSec}
              .units=${this.units}
            ></dashboard-ctrl-element>
          `
        : ''}
    </div>`;
  }
}
