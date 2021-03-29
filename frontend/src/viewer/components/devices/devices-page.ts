// Live tracker configuration.
import '../ui/google-btn';
import './elements';

import { TrackerIds } from 'flyxc/common/src/live-track';
import { AccountFormModel } from 'flyxc/common/src/models';
import { customElement, html, internalProperty, LitElement, queryAll, TemplateResult } from 'lit-element';

import { alertController } from '@ionic/core/components';
import { Binder } from '@vaadin/form/Binder';
import { field } from '@vaadin/form/Field';

@customElement('devices-page')
export class DevicesPage extends LitElement {
  @internalProperty()
  private isLoading = true;

  @internalProperty()
  private isSubmitting = false;

  @internalProperty()
  private loggedIn = false;

  private xsrfToken = '';

  @queryAll('device-card')
  private trackerPanels: any;

  // Make sure to refresh the components when the form data are updated.
  private binder = new Binder(this, AccountFormModel, {
    onChange: () => {
      this.requestUpdate();
      if (this.trackerPanels) {
        for (let i = 0; i < this.trackerPanels.length; i++) {
          this.trackerPanels[i].requestUpdate();
        }
      }
    },
  });

  connectedCallback(): void {
    super.connectedCallback();

    fetch(`/_account`)
      .then((response) => {
        this.isLoading = false;
        this.xsrfToken = response.headers.get('xsrf-token') ?? '';
        return response.ok ? response.json() : null;
      })
      .then((account) => {
        if (account != null) {
          this.loggedIn = true;
          this.binder.read(account);
        }
      });
  }

  render(): TemplateResult {
    let content: TemplateResult;

    if (this.isLoading || this.isSubmitting) {
      content = html`<ion-content class="ion-padding">
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
      </ion-content>`;
    } else if (this.loggedIn) {
      content = this.renderForm();
    } else {
      content = this.renderLogin();
    }

    return html`
      <style>
        device-form,
        devices-page {
          width: 100%;
          height: 100%;
        }
      </style>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Live tracking</ion-title>
          <ion-title size="small">Devices setup</ion-title>
        </ion-toolbar>
      </ion-header>
      ${content}
    `;
  }

  private renderForm(): TemplateResult {
    const model = this.binder.model;

    return html`
      <ion-content>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/line-awesome@1/dist/line-awesome/css/line-awesome.min.css"
        />
        <style>
          .block {
            display: block;
          }
        </style>
        <ion-card class="ion-padding-bottom">
          <ion-card-header>
            <ion-card-title color="primary"><i class="las la-user-cog"></i> General</ion-card-title>
          </ion-card-header>

          <flow-ion-check
            label="Tracking is enabled. Your live positions will be displayed on the map for 24h."
            labelOff="Tracking is disabled. You will not appear on the map."
            ...=${field(model.enabled)}
          ></flow-ion-check>

          <flow-ion-input label="Your name as displayed on the map" ...=${field(model.name)}> ></flow-ion-input>

          <flow-ion-check
            label="Share my positions across FlyXC live tracking providers (Only used by FlyMe at the moment)"
            ...=${field(model.share)}
          ></flow-ion-check>
        </ion-card>

        ${model.enabled.valueOf()
          ? html`<device-card
                .tracker=${TrackerIds.Inreach}
                .binder=${this.binder}
                .hint=${html`<ion-text class="ion-padding-horizontal ion-padding-top block">
                  Visit
                  <a href="https://explore.garmin.com/Social" target="_blank"> your InReach social profile</a>
                  and copy your MapShare address in the field below (it should look like
                  <strong>https://share.garmin.com/username</strong> or
                  <strong>https://share.garmin.com/Feed/Share/username</strong>).
                </ion-text>`}
                label="MapShare URL"
                inputmode="url"
              >
              </device-card>
              <device-card
                .tracker=${TrackerIds.Spot}
                .binder=${this.binder}
                label="Feed Id"
                .hint=${html`<ion-text class="ion-padding-horizontal ion-padding-top block">
                  Create an XML feed by following the instructions on this
                  <a
                    href="https://www.findmespot.com/en-us/support/spot-trace/get-help/general/spot-api-support"
                    target="_blank"
                    class="has-text-link"
                    >page</a
                  >
                  and copy the feed id into the field below (it should look like
                  <strong>0onlLopfoM4bG5jXvWRE8H0Obd0oMxMBq</strong>).
                </ion-text>`}
              >
              </device-card>
              <device-card
                .tracker=${TrackerIds.Skylines}
                .binder=${this.binder}
                label="Pilot Id"
                inputmode="numeric"
                .hint=${html`<ion-text class="ion-padding-horizontal ion-padding-top block">
                  Your pilot's id is at the end of your SkyLines profile url:
                  <strong>https://skylines.aero/users/id</strong> (it should be a numerical value like
                  <strong>1234</strong>).
                </ion-text>`}
              >
              </device-card>
              <device-card
                .tracker=${TrackerIds.Flyme}
                .binder=${this.binder}
                label="Username"
                inputmode="email"
                .hint=${html`<ion-text class="ion-padding-horizontal ion-padding-top block">
                  Enter your FlyMe (XCGlobe) username in the field above. It commonly is your email.
                </ion-text>`}
              >
              </device-card>
              <device-card
                .tracker=${TrackerIds.Flymaster}
                .binder=${this.binder}
                label="Device Id"
                .hint=${html`<ion-text class="ion-padding-horizontal ion-padding-top block">
                  Login to
                  <a href="https://lt.flymaster.net" target="_blank">lt.flymaster.net</a> and click on "My account",
                  followed by "My Instruments". Paste the numerical id of the instrument in the field below.
                </ion-text>`}
              >
              </device-card>`
          : null}
      </ion-content>
      <ion-footer>
        <ion-toolbar color="light">
          <ion-buttons slot="primary">
            <ion-button @click=${async () => await this.save()} .disabled=${this.binder.invalid}>Save</ion-button>
          </ion-buttons>
          <ion-buttons slot="secondary">
            <ion-button @click=${async () => await this.close()}>Cancel</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    `;
  }

  // Navigates back to the application.
  //
  // Use the return url when set.
  private async close(): Promise<void> {
    this.isLoading = true;
    try {
      await fetch('/logout');
    } catch (e) {}
    const url = localStorage.getItem('url.tracking.return');
    document.location.assign(url ?? '/');
  }

  // Saves the form values.
  private async save(): Promise<void> {
    if (this.binder.invalid) {
      return;
    }
    this.isSubmitting = true;
    let error: string | undefined;

    try {
      await this.binder.submitTo(async (values) => {
        let response: any;

        try {
          response = await fetch('/_account', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'xsrf-token': this.xsrfToken,
            },
            body: JSON.stringify(values),
          });
        } catch (e) {
          error = 'Unexpected error, please try again later!';
          return;
        }

        if (!response.ok) {
          error = 'Unexpected error, please try again later!';
          return;
        }

        const status = await response.json();

        if (status.error) {
          error = status.error;
          throw { validationErrorData: status.validationErrorData };
        }
      });
    } catch (e) {}

    console.log(error);

    if (error) {
      const alert = await alertController.create({
        header: 'Settings error',
        message: `<p>An error has occurred:</p><p>${error}</p>`,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
          },
        ],
      });
      await alert.present();
      this.isSubmitting = false;
    } else {
      const alert = await alertController.create({
        header: 'Settings updated',
        message: `<p>Your settings have been updated.</p>`,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
          },
        ],
      });
      await alert.present();
      await alert.onDidDismiss();
      await this.close();
    }
  }

  // Render the login info and button.
  private renderLogin(): TemplateResult {
    return html`
      <ion-content fullscreen class="ion-padding">
        <p>Sign in to configure your trackers by using the button below.</p>
        <p>
          Once your trackers have been configured, your tracks for the past 24 hours will appear on the map. The
          positions are automatically refreshed as they become available
          <strong>there is no need to manually reload</strong> the browser window.
        </p>
        <p>
          FlyXC records your name, email address, tracker address and the position of your tracker during the last 24
          hours only. While you need a google account to login to FlyXC, no information is ever shared with Google.
        </p>
        <p>Supported platforms:</p>
        <ul>
          <li>
            <a href="https://www.garmin.com/en-US/inreach/personal/" target="_blank" class="has-text-link">InReach</a>
          </li>
          <li><a href="https://www.findmespot.com/" target="_blank" class="has-text-link">Spot</a></li>
          <li><a href="https://skylines.aero/tracking/info" target="_blank" class="has-text-link">SkyLines</a></li>
          <li><a href="http://xcglobe.com/flyme" target="_blank" class="has-text-link">XCGlobe FlyMe</a></li>
          <li><a href="https://www.flymaster.net/" target="_blank" class="has-text-link">Flymaster</a></li>
        </ul>
        <p>
          <a href="mailto:help@flyxc.app?subject=FlyXC%20registration%20error" class="has-text-link" target="_blank">
            Contact us by email
          </a>
          if you have any trouble registering your device.
        </p>
        <google-btn></google-btn>
      </ion-content>
    `;
  }

  createRenderRoot(): HTMLElement {
    return this;
  }
}
