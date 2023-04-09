package com.cesium.demo.showcase.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {

	@GetMapping("/")
	public String getDemoPage() {
		return "demo";
	}
}
