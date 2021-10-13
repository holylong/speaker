/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.databean.Dialog');
goog.provide('proto.databean.Dialog.DialogStatus');
goog.provide('proto.databean.Dialog.DialogType');

goog.require('jspb.Message');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.databean.Dialog = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.databean.Dialog, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.databean.Dialog.displayName = 'proto.databean.Dialog';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.databean.Dialog.prototype.toObject = function(opt_includeInstance) {
  return proto.databean.Dialog.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.databean.Dialog} msg The msg instance to transform.
 * @return {!Object}
 */
proto.databean.Dialog.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: msg.getType(),
    userid: msg.getUserid(),
    peerid: msg.getPeerid(),
    password: msg.getPassword(),
    status: msg.getStatus(),
    media: msg.getMedia(),
    token: msg.getToken()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.databean.Dialog} The clone.
 */
proto.databean.Dialog.prototype.cloneMessage = function() {
  return /** @type {!proto.databean.Dialog} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional DialogType type = 1;
 * @return {!proto.databean.Dialog.DialogType}
 */
proto.databean.Dialog.prototype.getType = function() {
  return /** @type {!proto.databean.Dialog.DialogType} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {!proto.databean.Dialog.DialogType} value  */
proto.databean.Dialog.prototype.setType = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string userid = 2;
 * @return {string}
 */
proto.databean.Dialog.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.databean.Dialog.prototype.setUserid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string peerid = 3;
 * @return {string}
 */
proto.databean.Dialog.prototype.getPeerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.databean.Dialog.prototype.setPeerid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string password = 4;
 * @return {string}
 */
proto.databean.Dialog.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 4, ""));
};


/** @param {string} value  */
proto.databean.Dialog.prototype.setPassword = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional DialogStatus status = 5;
 * @return {!proto.databean.Dialog.DialogStatus}
 */
proto.databean.Dialog.prototype.getStatus = function() {
  return /** @type {!proto.databean.Dialog.DialogStatus} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {!proto.databean.Dialog.DialogStatus} value  */
proto.databean.Dialog.prototype.setStatus = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string media = 6;
 * @return {string}
 */
proto.databean.Dialog.prototype.getMedia = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 6, ""));
};


/** @param {string} value  */
proto.databean.Dialog.prototype.setMedia = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional string token = 7;
 * @return {string}
 */
proto.databean.Dialog.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 7, ""));
};


/** @param {string} value  */
proto.databean.Dialog.prototype.setToken = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * @enum {number}
 */
proto.databean.Dialog.DialogType = {
  UNKNOWN: 0,
  LOGIN: 1,
  TRANSFER: 2,
  LOGOUT: 3
};

/**
 * @enum {number}
 */
proto.databean.Dialog.DialogStatus = {
  STATUSUNKNOWN: 0,
  SUCCESS: 1,
  FAILED: 2,
  LOGINFAILED: 3,
  LOGINSUCCESS: 4,
  PEERUSEROFFLINE: 5
};

