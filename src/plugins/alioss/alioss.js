let client = new OSS.Wrapper({
  region: "oss-cn-hangzhou",
  accessKeyId: "LTAIKc4SmxqXnWjb",
  accessKeySecret: "n2mZHgH4SfHCaTOips4iuR2h4NOsjo",
  bucket: "ddup-img1"
});

export default {
    install(Vue, options){
        Object.defineProperties(Vue.prototype, { '$client': { value: client, writable: true } });
    }
}