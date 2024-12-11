// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiPath: 'http://localhost:8080/api/',
  cameraUrl: 'http://www.google.ch',
  mqtt: {
    hostname: '192.168.0.140',
		port: 9001
  },
  grafana: {
    urls: {
      climate: 'http://localhost:8081/climate?orgId=2&from=now-24h&to=now',
      lights: 'http://localhost:8081/lights?orgId=2&from=now-24h&to=now',
      motion: 'http://localhost:8081/motion?orgId=2&from=now-24h&to=now',
      power: 'http://localhost:8081/power?orgId=2&from=now-24h&to=now',
      windows: 'http://localhost:8081/windows?orgId=2&from=now-24h&to=now'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
