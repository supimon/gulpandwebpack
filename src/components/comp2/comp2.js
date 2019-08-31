import CompVendor from "../vendor/comp_vendor";
import $ from "jquery";

export default function comp2Fn() {
  console.log($(document).height());
  return CompVendor() + "=> comp2 js ";
}
