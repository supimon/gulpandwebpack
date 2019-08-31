import CompVendor from "../vendor/comp_vendor";
import $ from "jquery";

export default function comp1Fn() {
  console.log($(document).width());
  return CompVendor() + "=> comp1 js ";
}
