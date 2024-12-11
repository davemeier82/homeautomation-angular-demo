import 'angular-server-side-configuration/process';

/**
 * How to use angular-server-side-configuration:
 *
 * Use process.env['NAME_OF_YOUR_ENVIRONMENT_VARIABLE']
 *
 * export const environment = {
 *   stringValue: process.env['STRING_VALUE'],
 *   stringValueWithDefault: process.env['STRING_VALUE'] || 'defaultValue',
 *   numberValue: Number(process.env['NUMBER_VALUE']),
 *   numberValueWithDefault: Number(process.env['NUMBER_VALUE'] || 10),
 *   booleanValue: Boolean(process.env['BOOLEAN_VALUE']),
 *   booleanValueInverted: process.env['BOOLEAN_VALUE_INVERTED'] !== 'false',
 * };
 *
 * Please note that process.env[variable] cannot be resolved. Please directly use strings.
 */

export const environment = {
  production: true,
  apiPath: process.env['API_PATH'],
  cameraUrl: process.env['CAMERA_URL'],
  mqtt: {
    hostname: process.env['MQTT_HOST_NAME'],
    port: Number(String(process.env['MQTT_HOST_PORT']))
  },
  grafana: {
    urls: {
      climate: process.env['GRAFANA_CLIMATE_URL'],
      lights: process.env['GRAFANA_LIGHTS_URL'],
      motion: process.env['GRAFANA_MOTION_URL'],
      power: process.env['GRAFANA_POWER_URL'],
      windows: process.env['GRAFANA_WINDOWS_URL']
    }
  }
};
