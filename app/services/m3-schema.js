import Service from '@ember/service';

export default class M3SchemaService extends Service {
  includesModel() {
    return true;
  }

  computeAttribute(key, _, type, schema) {
    const rawValue = schema.getAttr(key);
    return rawValue;
  }

  computeBaseModelName() {
    return null;
  }

  useNativeProperties() {
    return true;
  }

  setAttribute(type, key, value, schema) {
    return schema.setAttr(key, value);
  }

  isAttributeResolved() {
    return false;
  }

  useUnderlyingErrorsValue() {
    return false;
  }
}
