package com.triona.users.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


import lombok.Data;

@Entity
@Data
public class Users {
	
	@Id
	@Column
    private long id;

    @Column
    @NotNull(message="{NotNull.User.firstName}")
    private String firstName;
    
    @Column
    @NotNull(message="{NotNull.User.lastName}")
    private String lastName;
 
    @Column
    @NotNull(message="{NotNull.User.adress}")
    private String adress;
    
    @Column
    @NotNull(message="{NotNull.User.birthDate}")
    private String birthDate;

    @Column
    @NotNull(message="{NotNull.User.phoneNumber}")
    private Integer phoneNumber;
   
}
