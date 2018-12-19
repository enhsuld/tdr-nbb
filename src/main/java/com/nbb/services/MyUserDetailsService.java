package com.nbb.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbb.dao.UserDao;
import com.nbb.models.LnkUserrole;
import com.nbb.models.LutUser;
import com.nbb.repository.UserRepository;


@Service("userDetailsService")
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository upo;
	
	@Autowired
    private UserDao dao;
	

	@Transactional(readOnly=true)
	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
	
		LutUser user = dao.findByUserName(username);
		List<LnkUserrole> rs=user.getLnkUserroles();
		List<GrantedAuthority> authorities = buildUserAuthority(rs);
		return buildUserForAuthentication(user, authorities);
		
	}

	private User buildUserForAuthentication(LutUser user, List<GrantedAuthority> authorities) {
		return new User(user.getUsername(), user.getPassword(), user.getIsactive(), true, true, true, authorities);
	}

	private List<GrantedAuthority> buildUserAuthority(List<LnkUserrole> list) {
		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();

		// Build user's authorities
		for (LnkUserrole userRole : list) {
			System.out.println("auth"+userRole.getLutRole().getRoleauth());
			setAuths.add(new SimpleGrantedAuthority(userRole.getLutRole().getRoleauth()));
		}

		List<GrantedAuthority> Result = new ArrayList<GrantedAuthority>(setAuths);

		return Result;
	}

}