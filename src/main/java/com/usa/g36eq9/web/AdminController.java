package com.usa.g36eq9.web;

import com.usa.g36eq9.model.Admin;
import com.usa.g36eq9.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/Admin")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/all")
    public List<Admin> getAdmins(){
        return adminService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Admin> getAdmin(@PathVariable("id") int idAdmin){
        return adminService.getAdmin(idAdmin);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin save(@RequestBody Admin admin){
        return adminService.save(admin);
    }

    @PutMapping("/update")
    public Admin update(@RequestBody Admin admin){
        return adminService.update(admin);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int idAdmin){
        return adminService.delete(idAdmin);
    }
}
