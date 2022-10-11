package com.usa.g36eq9.service;

import com.usa.g36eq9.model.Category;
import com.usa.g36eq9.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int idCategory){
        return categoryRepository.getCategory(idCategory);
    }

    public Category save(Category ct){
        if(ct.getId() == null){
            return categoryRepository.save(ct);
        }else{
            Optional<Category> ctaux = categoryRepository.getCategory(ct.getId());
            if(ctaux.isPresent()){
                return ct;
            }else{
                return categoryRepository.save(ct);
            }
        }
    }

    public Category update(Category ct){
        if(ct.getId() != null){
            Optional<Category> q = categoryRepository.getCategory(ct.getId());
            if(q.isPresent()){
                if(ct.getName() != null){
                    q.get().setName(ct.getName());
                }
                if(ct.getDescription() != null){
                    q.get().setDescription(ct.getDescription());
                }
                if(ct.getBoats() != null){
                    q.get().setBoats(ct.getBoats());
                }
                categoryRepository.save(q.get());
                return q.get();
            }else{
                return ct;
            }
        }else{
            return ct;
        }
    }
    public void delete(int id){
        Optional<Category> ct = categoryRepository.getCategory(id);
        if(ct.isPresent()){
            categoryRepository.delete(ct.get());
        }
    }
    public void deleteAll(){
        categoryRepository.deleteAll();
    }
}
